export const getNewsletterWelcomeTemplate = (email) => {
  const currentYear = new Date().getFullYear();

  const text = `
        Welcome to the Creative3Bx Inner Circle!
        Thank you for joining our community. We are excited to share tech insights, tips, and updates with you.
        Visit us at creative3bx.com.au to learn more.
      `;

  const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
              .container { max-width: 600px; margin: 20px auto; background: #f4f4f4; border-radius: 8px; overflow: hidden; }
              .card { background: #ffffff; margin: 0 15px 20px 15px; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
              .header { background-color: #000000; padding: 30px; text-align: center; border-bottom: 4px solid #7f1d1d; }
              .content { padding: 40px; }
              .h1 { color: #000000; margin-top: 0; font-size: 24px; font-weight: 700; }
              .message-body { color: #4a5568; font-size: 16px; margin: 20px 0; line-height: 1.8; }
              .status-tag { display: inline-block; padding: 4px 12px; background: #fff5f5; color: #7f1d1d; border: 1px solid #7f1d1d; border-radius: 20px; font-size: 12px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; }
              .footer { background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #718096; }
              .btn { display: inline-block; padding: 14px 30px; background-color: #7f1d1d; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; }
              @media only screen and (max-width: 480px) { 
                .content { padding: 30px 20px !important; text-align: center !important; } 
                .h1 { font-size: 20px !important; }
                .message-body { text-align: center !important; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://creative3bx.com.au/images/Logo-Creative3BxDark.svg" alt="Creative3Bx" width="180" style="display: block; margin: 0 auto;">
              </div>
              <div class="card">
                <div class="content">
                  <div class="status-tag">Status: Successfully Subscribed</div>
                  <h1 class="h1">Welcome to the Inner Circle</h1>
                  <div class="message-body">
                    <p>Thank you for choosing <strong>Creative3Bx IT Services</strong>. We are thrilled to have you join our community of forward-thinking professionals.</p>
                    
                    <p>By joining our newsletter, you'll be the first to receive exclusive tech insights, business automation tips, and critical updates directly from our engineering team.</p>
                    
                    <p>In the meantime, feel free to explore our latest thought-leadership articles:</p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="https://creative3bx.com.au" class="btn">Access Insights</a>
                    </div>

                    <p>We pride ourselves on providing high-value content. If there is a specific topic you want us to cover, simply reply to this email.</p>
                    
                    <p style="margin-top: 40px; font-size: 15px; text-align: left;">
                      Best regards,<br>
                      <strong>The Creative3Bx Team</strong>
                    </p>
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>You are receiving this because you signed up on our website.</p>
                <p>&copy; ${currentYear} Creative3Bx. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

  return { text, html };
};
