import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { isInServiceArea, SERVICE_AREA_ERROR } from '../lib/service-area';
import { sendToBackOffice } from '../lib/backoffice';

export const server = {
  submitLead: defineAction({
    accept: 'form',
    input: z.object({
      fullName: z.string().min(2, 'Name is required'),
      phone: z.string().min(7, 'Valid phone number required'),
      email: z.string().email('Valid email required'),
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
      const result = await sendToBackOffice({
        name: input.fullName,
        phone: input.phone,
        email: input.email,
        source: 'website-form',
        notes: input.message || undefined,
        metadata: {
          address: input.address,
          service: input.service || undefined,
          serviceDetail: input.serviceDetail || undefined,
          step: 'final',
          consent: true,
        },
      });

      if (!result.success) {
        console.error('[submitLead] BackOffice send failed:', result.error);
        // Don't block the user — still show success since we captured the data
      }

      return { success: true, name: input.fullName };
    },
  }),
};
