/**
 * there is an alternate way to do this, in theory
 * using SendMail from the actions file
 * which is a "server action" but it seems like there is no
 * way to get the response from the server action
 */

import * as Sendgrid from "@sendgrid/mail";
import { NextResponse } from "next/server";

const EMAIL_SENDER = "website@em1579.teamtedtile.com";
const EMAIL_RECEIVER = "tony@lopesdesign.com"; // me for testing

export async function POST(request: Request) {
  const params = await request.json();

  if (!process.env.SENDGRID_API_KEY) {
    return NextResponse.json({ success: false });
  }

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
    console.log(e);
    return NextResponse.json({ success: false });
  });
  return NextResponse.json({ success: true });
}
