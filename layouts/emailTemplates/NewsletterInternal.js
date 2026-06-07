export const getNewsletterInternalTemplate = (email) => {
  const currentYear = new Date().getFullYear();

  const text = `
        New Newsletter Subscriber via Creative3Bx
        Email: ${email}
        Action: Please add this user to the official mailing list.
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
              .banner { background-color: #2b6cb0; color: #ffffff; padding: 12px; text-align: center; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; font-size: 14px; }
              .content { padding: 40px; }
              .h1 { color: #000000; margin-top: 0; font-size: 24px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px; }
              .info-box { background-color: #f8fafc; border-left: 4px solid #2b6cb0; padding: 20px; margin-top: 20px; }
              .label { font-weight: bold; color: #7f1d1d; text-transform: uppercase; font-size: 11px; margin-bottom: 5px; }
              .value { color: #2d3748; font-size: 18px; font-weight: bold; }
              .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="banner">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/info.png" width="20" height="20" style="vertical-align: middle; margin-right: 8px;" alt="i">
                Growth Alert: New Subscriber
              </div>
              <div class="header">
                <img src="https://creative3bx.com.au/images/Logo-Creative3BxDark.svg" alt="Creative3Bx" width="200" style="display: block; margin: 0 auto;">
              </div>
              <div class="content">
                <h1 class="h1">Subscriber Notification</h1>
                <p>Hello Team, a new user has joined the Creative3Bx community via the newsletter subscription form. Please ensure their details are synchronized with our primary outreach platform.</p>
                
                <div class="info-box">
                  <div class="label">User Email</div>
                  <div class="value">${email}</div>
                </div>

                <p style="margin-top: 40px; font-size: 14px; color: #718096;">
                  This is an automated system notification from the Creative3Bx Infrastructure.
                </p>
              </div>
              <div class="footer">
                <p>&copy; ${currentYear} Creative3Bx. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

  return { text, html };
};
