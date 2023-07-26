/**
 * there is an alternate way to do this, in theory
 * using SendMail from the actions file
 * which is a "server action" but it seems like there is no
 * way to get the response from the server action
 */

import * as Sendgrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.SENDGRID_API_KEY) {
    return NextResponse.json({ success: false });
  }

  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const GA_API_SECRET = process.env.GA_API_SECRET;
  // this is the verified email defined in the Sendgrid dashboard
  const EMAIL_SENDER = "website@em1579.teamtedtile.com";
  const GOOGLE_ERROR_EVENT = "email_send_error";

  const params = await request.json();

  /**
   * the cypress test (or I, in one offs) will fill in the form
   * on the contact page with tony@lopesdesign.com as the inquirer email
   * otherwise, send to Ted
   */
  const EMAIL_RECEIVER =
    params.email === "tony@lopesdesign.com"
      ? "tony@lopesdesign.com"
      : "teamtedtile@comcast.net";

  Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: EMAIL_RECEIVER,
    from: EMAIL_SENDER, // Use the email address or domain you verified above
    subject: "An inquiry from teamtedtile.com",
    html:
      "from email: " +
      params.email +
      "<br>" +
      "from phone number: " +
      params.telephone +
      "<br>" +
      "message: " +
      params.message,
  };

  const response = await Sendgrid.send(msg).catch((e) => {
    // send a google error event
    if (GA_MEASUREMENT_ID && GA_API_SECRET) {
      fetch(
        `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
        {
          method: "POST",
          body: JSON.stringify({
            client_id: params.clientID || "unknown",
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
    return NextResponse.json({ success: false });
  });
  return NextResponse.json({ success: true });
}
