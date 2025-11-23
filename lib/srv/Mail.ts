'use server'

import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

const brevoApiKey = process.env.BREVO_API_KEY

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GA_API_SECRET = process.env.GA_API_SECRET;
const GOOGLE_ERROR_EVENT = "email_send_error";

export const sendMail = async ({ email, telephone, messageText, clientID }: { email?: string; telephone?: string; messageText: string; clientID?: string }) => {
    if (!brevoApiKey) {
        throw new Error('api key problem')
    }

    const messageTo = email === "tony@lopesdesign.com" ? {
        email: "tony@lopesdesign.com",
        name: "Tony Lopes"
    } : {
        email: "teamtedtile@comcast.net",
        name: "Ted Calvert"
    }

    try {
        let emailAPI = new TransactionalEmailsApi();
    
        emailAPI.setApiKey(0, brevoApiKey)
        
        let message = new SendSmtpEmail();
        message.subject = "Inquiry from teamtedtile.com";
        message.textContent = `from email: ${email}\n from phone number: ${telephone}\n message: ${messageText}`;
        message.sender = { name: "server", email: "tony@lopesdesign.com" };
        message.to = [messageTo];
        
        const response = await emailAPI.sendTransacEmail(message)
        if (!response || response.response.statusCode !== 201) {
            if (GA_MEASUREMENT_ID && GA_API_SECRET) {
                fetch(
                `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                    client_id: clientID || "unknown",
                    events: [
                        {
                        name: GOOGLE_ERROR_EVENT,
                        params: {},
                        },
                    ],
                    }),
                }
                );
            }
            throw new Error('email not sent')
        }

        return {
            status: true,
            data: response.response.statusMessage
        }
    } catch (e: any) {
        return {
            status: false,
            message: `sendMail not successful: ${e.message}`
        }
    }


}
