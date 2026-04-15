import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { isInServiceArea, SERVICE_AREA_ERROR } from '../lib/service-area';
import { sendToBackOffice } from '../lib/backoffice';
import { trackServerEvent, identifyProfile } from '../lib/analytics';
import { sendMetaEvent, getMetaCookies } from '../lib/meta-capi';

export const server = {
  submitLead: defineAction({
    accept: 'form',
    input: z.object({
      fullName: z.string().min(2, 'Name is required'),
      phone: z.string().min(7, 'Enter a 10-digit phone number (e.g. 650-977-3351)'),
      email: z.string().email('Enter a valid email address (e.g. name@example.com)'),
      address: z.string().min(3, 'Project address required'),
      service: z.string().optional(),
      serviceDetail: z.string().optional(),
      message: z.string().optional(),
      fbclid: z.string().optional(),
      fbc: z.string().optional(),
      gclid: z.string().optional(),
      utm_source: z.string().optional(),
      utm_medium: z.string().optional(),
      utm_campaign: z.string().optional(),
      utm_content: z.string().optional(),
      utm_term: z.string().optional(),
      consent: z.literal('on', {
        errorMap: () => ({ message: 'You must agree to the terms' }),
      }),
    }),
    handler: async (input, context) => {
      const isDev = import.meta.env.DEV;
      if (!isDev && !(await isInServiceArea(input.address))) {
        throw new ActionError({ code: 'BAD_REQUEST', message: SERVICE_AREA_ERROR });
      }

      // Send to BackOffice CRM — deduplicates by phone/email so this is
      // safe even if partial saves already created the contact.
      const noteParts: string[] = [];
      if (input.address) noteParts.push(`Address: ${input.address}`);
      if (input.service) noteParts.push(`Service: ${input.service}`);
      if (input.serviceDetail) noteParts.push(`Detail: ${input.serviceDetail}`);
      if (input.message) noteParts.push(`Message: ${input.message}`);
      const notes = noteParts.join(' | ') || undefined;

      const result = await sendToBackOffice({
        name: input.fullName,
        phone: input.phone,
        email: input.email,
        source: 'website-form',
        notes,
        ...(input.fbclid && { fbclid: input.fbclid }),
        ...(input.fbc && { fbc: input.fbc }),
        ...(input.utm_source && { utm_source: input.utm_source }),
        ...(input.utm_medium && { utm_medium: input.utm_medium }),
        ...(input.utm_campaign && { utm_campaign: input.utm_campaign }),
      });

      if (!result.success) {
        console.error('[submitLead] BackOffice send failed:', result.error);
        // Don't block the user — still show success since we captured the data
      }

      // Server-side analytics — bypasses ad blockers, 100% accurate
      const [firstName, ...lastParts] = input.fullName.split(' ');
      identifyProfile({
        email: input.email,
        firstName,
        lastName: lastParts.join(' '),
        phone: input.phone,
        properties: {
          address: input.address,
          service: input.service || 'general',
          source: 'hero_form',
          // First-touch attribution on profile — survives across sessions in OpenPanel
          ...(input.utm_source && { utm_source: input.utm_source }),
          ...(input.utm_medium && { utm_medium: input.utm_medium }),
          ...(input.utm_campaign && { utm_campaign: input.utm_campaign }),
          ...(input.utm_content && { utm_content: input.utm_content }),
          ...(input.utm_term && { utm_term: input.utm_term }),
        },
      });
      trackServerEvent('lead_form_submitted', {
        profileId: input.email,
        service: input.service || 'general',
        source: 'hero_form',
        // UTMs on the event — enables breakdown by campaign/creative in OpenPanel
        ...(input.utm_source && { utm_source: input.utm_source }),
        ...(input.utm_medium && { utm_medium: input.utm_medium }),
        ...(input.utm_campaign && { utm_campaign: input.utm_campaign }),
        ...(input.utm_content && { utm_content: input.utm_content }),
        ...(input.utm_term && { utm_term: input.utm_term }),
      });

      // Meta CAPI — server-side Lead event (deduped with client-side Pixel via eventId)
      const eventId = crypto.randomUUID();
      const request = context.request;
      const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
      const userAgent = request.headers.get('user-agent') || '';
      const cookies = getMetaCookies(request);
      // Use client-persisted fbc (from sessionStorage) when Safari ITP killed the cookie
      const fbc = cookies.fbc || input.fbc;
      const fbp = cookies.fbp;
      const pageUrl = request.headers.get('referer') || 'https://hamilton-exteriors.com';

      sendMetaEvent({
        eventName: 'Lead',
        eventId,
        eventSourceUrl: pageUrl,
        userData: {
          email: input.email,
          phone: input.phone,
          firstName,
          lastName: lastParts.join(' '),
          clientIp,
          userAgent,
          fbc,
          fbp,
        },
        customData: {
          currency: 'USD',
          contentType: 'service',
          contentIds: [input.service || 'general'],
        },
      });

      // Fire n8n LP webhook — triggers OpenPhone msg, AI call, email sequences
      const n8nUrl = import.meta.env.N8N_LP_WEBHOOK_URL || 'https://n8n.contai.app/webhook/new_lp';
      fetch(n8nUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Email': input.email,
          'Message': input.message || '',
          'Name': input.fullName,
          'Phone Number': input.phone,
          'address': input.address,
          'current-url': pageUrl,
          'utm_source': input.utm_source || '',
          'utm_medium': input.utm_medium || '',
          'utm_campaign': input.utm_campaign || '',
          'utm_content': input.utm_content || '',
          'utm_term': input.utm_term || '',
        }),
        signal: AbortSignal.timeout(8_000),
      }).catch(err => console.error('[n8n webhook] Failed:', (err as Error).message));

      return { success: true, name: input.fullName, eventId };
    },
  }),
};
