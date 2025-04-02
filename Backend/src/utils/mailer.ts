import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'facebooksecuretty@gmail.com', // Your email
    pass: 'futdpzkmyneefaav',      // App-specific password from Google
  },
});

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
    const mailOptions = {
        from: '"Resource Management App" <facebooksecuretty@gmail.com>',
        to,
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <table width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #0071AC; border-top-left-radius: 8px; border-top-right-radius: 8px;">
                </td>
              </tr>
              <tr>
                <td style="padding: 30px; text-align: left;">
                  <h2 style="color: #333333;">Password Reset Request</h2>
                  <p style="color: #555555;">Hi,</p>
                  <p style="color: #555555;">
                    You recently requested to reset your password for your <strong>Resource Management App</strong> account. Click the button below to reset it.
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" style="background-color: #0071AC; color: #ffffff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                      Reset Password
                    </a>
                  </div>
                  <p style="color: #555555; text-align: center;">
                    This link will expire in 1 hour. If you did not request a password reset, please ignore this email.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center; background-color: #f4f4f4; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; color: #888888; font-size: 12px;">
                  © 2025 Credenca. All rights reserved.<br>
                  If you need assistance, contact us at <a href="mailto:support@credenca.com" style="color: #0071AC;">facebooksecuretty@gmail.com</a>
                </td>
              </tr>
            </table>
          </div>
        `,
      };
      

  await transporter.sendMail(mailOptions);
};
