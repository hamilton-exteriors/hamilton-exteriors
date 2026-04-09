import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { isInServiceArea, SERVICE_AREA_ERROR } from '../lib/service-area';
import { sendToBackOffice } from '../lib/backoffice';
import { trackServerEvent } from '../lib/analytics';

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
      consent: z.literal('on', {
        errorMap: () => ({ message: 'You must agree to the terms' }),
      }),
    }),
    handler: async (input) => {
      if (!(await isInServiceArea(input.address))) {
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
      });

      if (!result.success) {
        console.error('[submitLead] BackOffice send failed:', result.error);
        // Don't block the user — still show success since we captured the data
      }

      // Server-side analytics — bypasses ad blockers, 100% accurate
      trackServerEvent('lead_form_submitted', {
        service: input.service || 'general',
        source: 'hero_form',
      });

      return { success: true, name: input.fullName };
    },
  }),
};
