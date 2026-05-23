export const getCustomerAcknowledgmentTemplate = (from_name) => {
  const currentYear = new Date().getFullYear();

  const text = `
        Hello ${from_name},
        Thank you for contacting Creative3Bx IT Services. We have received your message and acknowledge your request for support.
        Our team is currently reviewing your inquiry and working diligently to provide you with the best solution. 
        We pride ourselves on delivering exceptional customer service, and your satisfaction is our top priority. 
        Best regards,
        Creative3Bx Support Admin
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
              .btn { display: inline-block; padding: 14px 30px; background-color: #7f1d1d; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; transition: background 0.2s; }
              @media only screen and (max-width: 480px) { 
                .content { padding: 30px 20px !important; text-align: center !important; } 
                .h1 { font-size: 20px !important; text-align: center !important; } 
                .message-body { text-align: center !important; font-size: 15px !important; }
                .status-tag { margin: 0 auto 20px auto !important; display: table !important; }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <img src="https://creative3bx.com/images/Logo-Creative3BxDark.svg" alt="Creative3Bx" width="180" style="display: block; margin: 0 auto;">
              </div>
              <div class="card">
                <div class="content">
                  <div class="status-tag">Status: Inquiry Received</div>
                  <h1 class="h1">Hello ${from_name},</h1>
                  <div class="message-body">
                    <p>Thank you for choosing <strong>Creative3Bx IT Services</strong>. We have officially received your inquiry and our engineering team has been notified.</p>
                    
                    <p>We are currently reviewing the details you provided. At Creative3Bx, we treat every request with technical precision and care. You can expect an update from one of our specialists shortly.</p>
                    
                    <p>While you wait, feel free to explore our documentation or latest case studies on our portal:</p>
                    
                    <div style="text-align: center; margin: 35px 0;">
                      <a href="https://creative3bx.com" class="btn">Access Client Resources</a>
                    </div>

                  <p>We pride ourselves on delivering exceptional customer service, and your satisfaction is our top priority. Rest assured, we will address your concern with utmost care and expertise.</p>
                  
                  <p>If you have any additional details to provide, simply reply directly to this email.</p>
                  
                  <p style="margin-top: 40px; font-size: 15px; text-align: left;">
                    Best regards,<br>
                    <strong>Creative3Bx Support Admin</strong>
                  </p>
                </div>
              </div>
              <div class="footer">
                <p>This is an automated acknowledgment. Our team will contact you shortly.</p>
                <p>&copy; ${currentYear} Creative3Bx. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

  return { text, html };
};
