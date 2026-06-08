export const getSupportChatFailureTemplate = (data) => {
  const { from_name, from_email, from_phone, status, message } = data;
  const currentYear = new Date().getFullYear();

  const text = `
        CRITICAL: Live Chat Failed - Direct Action Required
        From: ${from_name} (${from_email})
        Phone: ${from_phone || "Not Provided"}
        Reason: ${
          message ||
          "The user attempted to start a live chat session, but the connection to the widget failed."
        }
        Please contact this user immediately.
      `;

  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #fef2f2; }
              .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 2px solid #dc2626; }
              .header { background-color: #000000; padding: 30px; text-align: center; }
              .urgency-banner { background-color: #dc2626; color: #ffffff; padding: 15px; text-align: center; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; font-size: 16px; }
              .content { padding: 40px; }
              .h1 { color: #000000; margin-top: 0; font-size: 24px; font-weight: 800; }
              .alert-box { background-color: #fff5f5; border-left: 5px solid #dc2626; padding: 20px; margin: 25px 0; }
              .info-grid { width: 100%; border-collapse: collapse; }
              .info-grid td { padding: 12px 0; border-bottom: 1px solid #f0f0f0; }
              .status-tag { display: inline-block; padding: 4px 12px; background: #fff5f5; color: #dc2626; border: 1px solid #dc2626; border-radius: 20px; font-size: 11px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; }
              .label { font-weight: bold; color: #7f1d1d; width: 120px; font-size: 12px; text-transform: uppercase; }
              .value { color: #1a202c; font-size: 16px; }
              .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
              .btn { display: inline-block; padding: 14px 28px; background-color: #000000; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="urgency-banner">
                <img src="https://img.icons8.com/ios-filled/50/fbc02d/error.png" width="24" height="24" style="vertical-align: middle; margin-right: 10px;" alt="!">
                Immediate Action: Chat Failover Triggered
              </div>
              <div class="header">
                <img src="https://creative3bx.com.au/images/Logo-Creative3BxDark.svg" alt="Creative3Bx" width="180" style="display: block; margin: 0 auto;">
              </div>
              <div class="content">
                <h1 class="h1">Chat System Interrupted</h1>
                ${
                  status
                    ? `<div class="status-tag">Status: ${status}</div>`
                    : ""
                }
                <p>A high-intent prospect tried to use the live chat, but the system encountered an initialization error. <strong>Follow up immediately</strong> to prevent churn.</p>
                
                <div class="alert-box">
                  <table class="info-grid">
                    <tr>
                      <td class="label">Lead Name</td>
                      <td class="value">${from_name}</td>
                    </tr>
                    <tr>
                      <td class="label">Direct Email</td>
                      <td class="value"><a href="mailto:${from_email}" style="color: #dc2626; text-decoration: none; font-weight: bold;">${from_email}</a></td>
                    </tr>
                    <tr>
                      <td class="label">Phone</td>
                      <td class="value">${from_phone || "Not Provided"}</td>
                    </tr>
                  </table>
                </div>

                <p style="font-size: 14px; color: #4a5568;">Technical Context: ${
                  message ||
                  "The user successfully submitted the pre-chat form, but the widget failed to toggle open. The data above was captured via the failover bridge."
                }</p>

                <div style="text-align: left;">
                  <a href="mailto:${from_email}" class="btn">Reply via Email Now</a>
                </div>

                <p style="margin-top: 40px; font-size: 15px; text-align: left; color: #1a202c;">
                  Best regards,<br>
                  <strong>Creative3Bx Failover System</strong>
                </p>
              </div>
              <div class="footer">
                <p>Internal Security & Ops Alert</p>
                <p>&copy; ${currentYear} Creative3Bx. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;
  return { text, html };
};
