import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro/zod';
import { isInServiceArea, SERVICE_AREA_ERROR } from '../lib/service-area';

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

      // TODO: Send to CRM, email, or webhook
      if (import.meta.env.DEV) console.log('New lead:', input);
      return { success: true, name: input.fullName };
    },
  }),
};
