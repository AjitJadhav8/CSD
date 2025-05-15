import axios from 'axios';

// Configuration
const config = {
  tenantId: '',
  clientId: '',
  clientSecret: '',
  userEmail: 'donotreply@credenca.com' // The mailbox you're sending from
};


interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  ext_expires_in: number;
}

async function getAccessToken(): Promise<string> {
  const url = `https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`;
  
  const params = new URLSearchParams();
  params.append('client_id', config.clientId);
  params.append('scope', 'https://graph.microsoft.com/.default');
  params.append('client_secret', config.clientSecret);
  params.append('grant_type', 'client_credentials');

  const response = await axios.post<TokenResponse>(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  return response.data.access_token;
}

// Type guard for AxiosError
function isAxiosError(error: unknown): error is { isAxiosError: boolean, response?: { data: any }, message: string } {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

// Send Email Function
export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
  try {
    const accessToken = await getAccessToken();

    const emailData = {
      message: {
        subject: 'Password Reset Request',
        body: {
          contentType: 'HTML',
          content: `
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
                    If you need assistance, contact us at <a href="mailto:donotreply@credenca.com" style="color: #0071AC;">donotreply@credenca.com</a>
                  </td>
                </tr>
              </table>
            </div>
          `
        },
        toRecipients: [
          {
            emailAddress: {
              address: to
            }
          }
        ]
      },
      saveToSentItems: 'true'
    };

    await axios.post(
      `https://graph.microsoft.com/v1.0/users/${config.userEmail}/sendMail`,
      emailData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Email sent successfully');
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error('Error sending email:', error.response?.data || error.message);
      throw error;
    } else if (error instanceof Error) {
      console.error('Error sending email:', error.message);
      throw error;
    } else {
      console.error('Unknown error sending email:', error);
      throw new Error('Unknown error occurred while sending email');
    }
  }
};