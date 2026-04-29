import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { isInServiceArea, SERVICE_AREA_ERROR } from '../lib/service-area';
import { sendToBackOffice } from '../lib/backoffice';
import { trackServerEvent, identifyProfile } from '../lib/analytics';
import { sendMetaEvent, getMetaCookies } from '../lib/meta-capi';
import { sendLeadEmail } from '../lib/resend';

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
      op_device_id: z.string().optional(),
      op_session_id: z.string().optional(),
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

      // Parallelize all the things that don't depend on each other so the
      // user's response isn't paying for the sum of every network call.
      // Only sendLeadEmail needs to wait — it includes the CRM save status.
      const session = {
        ...(input.op_device_id && { deviceId: input.op_device_id }),
        ...(input.op_session_id && { sessionId: input.op_session_id }),
      };
      const [firstName, ...lastParts] = input.fullName.split(' ');
      const eventId = crypto.randomUUID();
      const request = context.request;
      const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '';
      const userAgent = request.headers.get('user-agent') || '';
      const cookies = getMetaCookies(request);
      const fbc = cookies.fbc || input.fbc;
      const fbp = cookies.fbp;
      const pageUrl = request.headers.get('referer') || 'https://hamilton-exteriors.com';

      const [result] = await Promise.all([
        sendToBackOffice({
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
        }),
        identifyProfile({
          email: input.email,
          firstName,
          lastName: lastParts.join(' '),
          phone: input.phone,
          properties: {
            address: input.address,
            service: input.service || 'general',
            source: 'hero_form',
            ...(input.utm_source && { utm_source: input.utm_source }),
            ...(input.utm_medium && { utm_medium: input.utm_medium }),
            ...(input.utm_campaign && { utm_campaign: input.utm_campaign }),
            ...(input.utm_content && { utm_content: input.utm_content }),
            ...(input.utm_term && { utm_term: input.utm_term }),
            ...(input.gclid && { gclid: input.gclid }),
            ...(input.fbclid && { fbclid: input.fbclid }),
          },
        }, session),
        trackServerEvent('lead_form_submitted', {
          profileId: input.email,
          service: input.service || 'general',
          source: 'hero_form',
          ...(input.utm_source && { utm_source: input.utm_source }),
          ...(input.utm_medium && { utm_medium: input.utm_medium }),
          ...(input.utm_campaign && { utm_campaign: input.utm_campaign }),
          ...(input.utm_content && { utm_content: input.utm_content }),
          ...(input.utm_term && { utm_term: input.utm_term }),
        }, session),
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
        }),
      ]);

      if (!result.success) {
        console.error('[submitLead] BackOffice send failed:', result.error);
      }

      // Email backstop — fires after BackOffice resolves so the email reflects
      // the actual save status. Recoverable from admin@ even if CRM rejected.
      try {
        await sendLeadEmail({
          name: input.fullName,
          phone: input.phone,
          email: input.email,
          address: input.address,
          service: input.service,
          serviceDetail: input.serviceDetail,
          message: input.message,
          step: 'full',
          source: 'hero_form',
          utm_source: input.utm_source,
          utm_medium: input.utm_medium,
          utm_campaign: input.utm_campaign,
          utm_content: input.utm_content,
          utm_term: input.utm_term,
          gclid: input.gclid,
          fbclid: input.fbclid,
          backofficeStatus: result.success
            ? (result.duplicate ? 'saved_duplicate' : 'saved')
            : 'failed',
          backofficeError: result.error,
          pageUrl: request.headers.get('referer') || undefined,
        });
      } catch (err) {
        console.error('[submitLead] Resend notification failed:', (err as Error).message);
      }

      return { success: true, name: input.fullName, eventId };
    },
  }),
};
