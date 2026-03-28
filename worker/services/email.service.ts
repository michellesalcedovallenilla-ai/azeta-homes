/**
 * Email notification service. Uses a simple HTTP API (compatible with Resend, Mailchannels, etc.).
 * Fire-and-forget: failures are logged but don't block the request.
 */
export class EmailService {
  constructor(
    private apiKey: string,
    private notificationEmail: string,
  ) {}

  async sendLeadNotification(lead: {
    name: string;
    email: string;
    phone?: string | null;
    message: string;
  }): Promise<void> {
    if (!this.apiKey || !this.notificationEmail) {
      console.warn('[EMAIL] Email service not configured, skipping notification');
      return;
    }

    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: 'Azeta Homes <notifications@azetahomes.com>',
          to: this.notificationEmail,
          subject: `New Lead: ${lead.name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
            ${lead.phone ? `<p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${escapeHtml(lead.message)}</p>
          `,
        }),
      });

      if (!response.ok) {
        console.error('[EMAIL] Failed to send notification', {
          status: response.status,
          statusText: response.statusText,
        });
      }
    } catch (err) {
      console.error('[EMAIL] Error sending notification', err);
    }
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
