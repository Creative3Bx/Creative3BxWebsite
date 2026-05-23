export const getInternalNotificationTemplate = (data) => {
  const {
    from_name,
    from_email,
    from_phone,
    from_BusinessName,
    from_Address,
    message,
    status,
  } = data;

  const currentYear = new Date().getFullYear();

  // Logic to determine if this is just an Info notification or requires Urgent Action
  const isInfo = status === "Working Convo - Chat Started";
  const bannerText = isInfo
    ? "Notification: Live Chat Session Active"
    : "Action Required: High Priority Lead";
  const bannerColor = isInfo ? "#2b6cb0" : "#7f1d1d"; // Blue for Info, Red for Action
  const iconUrl = isInfo
    ? "https://img.icons8.com/ios-filled/50/ffffff/info.png"
    : "https://img.icons8.com/ios-filled/50/fbc02d/error.png";
  const iconAlt = isInfo ? "i" : "!";

  const text = `
        New Message Received via Creative3Bx
        From: ${from_name} (${from_email})
        Phone: ${from_phone || "N/A"}
        Business: ${from_BusinessName || "N/A"}
        Address: ${from_Address || "N/A"}
        Message: ${message}
      `;

  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
              .header { background-color: #000000; padding: 30px; text-align: center; border-bottom: 4px solid #7f1d1d; }
              .urgency-banner { color: #ffffff; padding: 12px; text-align: center; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; font-size: 16px; }
              .content { padding: 40px; }
              .h1 { color: #000000; margin-top: 0; font-size: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
              .info-grid { width: 100%; margin: 25px 0; border-collapse: collapse; }
              .info-grid td { padding: 12px; border-bottom: 1px solid #f9f9f9; vertical-align: top; }
              .label { font-weight: bold; color: #7f1d1d; width: 130px; text-transform: uppercase; font-size: 11px; }
              .value { color: #2d3748; font-size: 15px; }
              .message-box { background-color: #f8fafc; border-left: 4px solid #7f1d1d; padding: 20px; margin-top: 20px; font-style: italic; color: #1a202c; }
              .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
              .status-tag { display: inline-block; padding: 4px 12px; background: #fff5f5; color: #7f1d1d; border: 1px solid #7f1d1d; border-radius: 20px; font-size: 11px; font-weight: bold; margin-bottom: 15px; text-transform: uppercase; }
              .btn { display: inline-block; padding: 12px 25px; background-color: #7f1d1d; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="urgency-banner" style="background-color: ${bannerColor};">
                <img src="${iconUrl}" width="24" height="24" style="vertical-align: middle; margin-right: 8px; width: 24px; height: 24px;" alt="${iconAlt}">
                ${bannerText}
              </div>
              <div class="header">
                <img src="https://creative3bx.com/images/Logo-Creative3BxDark.svg" alt="Creative3Bx" width="200" style="display: block; margin: 0 auto;">
              </div>
              <div class="content">
                <h1 class="h1">New Lead Inquiry</h1>
                ${
                  status
                    ? `<div class="status-tag">Status: ${status}</div>`
                    : ""
                }
                <p>Hello Team, a new client has reached out through the website contact form. Please review the details below and respond within 2 hours to maintain our service standards.</p>
                
                <table class="info-grid">
                  <tr>
                    <td class="label">Client Name</td>
                    <td class="value">${from_name}</td>
                  </tr>
                  <tr>
                    <td class="label">Email</td>
                    <td class="value"><a href="mailto:${from_email}" style="color: #7f1d1d;">${from_email}</a></td>
                  </tr>
                  <tr>
                    <td class="label">Phone</td>
                    <td class="value">${from_phone || "Not Provided"}</td>
                  </tr>
                  <tr>
                    <td class="label">Business</td>
                    <td class="value">${from_BusinessName || "N/A"}</td>
                  </tr>
                  <tr>
                    <td class="label">Address</td>
                    <td class="value">${from_Address || "N/A"}</td>
                  </tr>
                </table>

                <div style="font-weight: bold; font-size: 14px; margin-top: 30px;">Subject / Message:</div>
                <div class="message-box">
                  ${message.replace(/\n/g, "<br>")}
                </div>

                <div style="text-align: left; margin-top: 30px;">
                  <a href="mailto:${from_email}" class="btn">Reply to Customer</a>
                </div>

                <p style="margin-top: 40px; font-size: 15px; text-align: left; color: #4a5568;">
                  Best regards,<br>
                  <strong>Creative3Bx Support Admin</strong>
                </p>
              </div>
              <div class="footer">
                <p>Sent via Creative3Bx Internal Notification System</p>
                <p>&copy; ${currentYear} Creative3Bx. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

  return { text, html };
};
