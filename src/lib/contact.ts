export type ContactMessage = {
  email: string;
  subject: string;
  message: string;
};

export type SendContactMessageResult =
  | { success: true }
  | { success: false; error: string };

const CONTACT_ENDPOINT = '/api/send';

export async function sendContactMessage(
  message: ContactMessage,
): Promise<SendContactMessageResult> {
  try {
    const response = await fetch(CONTACT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      return { success: false, error: `HTTP error! status: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message',
    };
  }
}
