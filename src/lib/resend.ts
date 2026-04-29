/**
 * Resend email client — backstop notification for new/partial leads.
 *
 * Fires an email to admin@hamilton-exteriors.com on every lead submission
 * (full or partial) so the contact info is recoverable from the inbox
 * even if BackOffice is paused, unreachable, or rejects the webhook.
 */

const API_KEY = import.meta.env.RESEND_API_KEY || '';
const FROM = 'Hamilton Leads <leads@notifications.hamilton-exteriors.com>';
const TO = 'admin@hamilton-exteriors.com';

export interface LeadEmailInput {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  service?: string;
  serviceDetail?: string;
  message?: string;
  step?: number | 'full';
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
  pageUrl?: string;
}

export async function sendLeadEmail(lead: LeadEmailInput): Promise<void> {
  if (!API_KEY) {
    console.warn('[resend] RESEND_API_KEY not set — skipping lead notification');
    return;
  }

  const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
  const kind = lead.step === 'full' ? 'New lead' : `Partial lead (step ${lead.step})`;

  const subjectBits = [
    kind,
    lead.name,
    lead.phone,
    lead.address,
  ].filter(Boolean);
  const subject = subjectBits.join(' · ');

  const attribution = [
    lead.utm_source && `utm_source=${lead.utm_source}`,
    lead.utm_medium && `utm_medium=${lead.utm_medium}`,
    lead.utm_campaign && `utm_campaign=${lead.utm_campaign}`,
    lead.utm_content && `utm_content=${lead.utm_content}`,
    lead.utm_term && `utm_term=${lead.utm_term}`,
    lead.gclid && `gclid=${lead.gclid}`,
    lead.fbclid && `fbclid=${lead.fbclid}`,
  ].filter(Boolean).join('\n');

  const lines = [
    `${kind}`,
    `Submitted: ${submittedAt} PT`,
    ``,
    `Name:    ${lead.name || '-'}`,
    `Phone:   ${lead.phone || '-'}`,
    `Email:   ${lead.email || '-'}`,
    `Address: ${lead.address || '-'}`,
    `Service: ${lead.service || '-'}${lead.serviceDetail ? ` (${lead.serviceDetail})` : ''}`,
    lead.message ? `Message: ${lead.message}` : '',
    ``,
    `Source:  ${lead.source}`,
    lead.pageUrl ? `Page:    ${lead.pageUrl}` : '',
    ``,
    attribution ? `— Attribution —\n${attribution}` : '',
  ].filter(Boolean).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      subject,
      text: lines,
      reply_to: lead.email || undefined,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body.slice(0, 200)}`);
  }
}
