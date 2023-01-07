// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formData from "form-data";
import Mailgun from "mailgun.js";

const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const MAILGUN_EMAIL_SENDER = "server@teamtedtile.com";
const MAILGUN_EMAIL_RECEIVER = "tony@lopesdesign.com"; // me for testing

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<"success" | "fail" | Error>
) {
  if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
    return;
  }

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: MAILGUN_API_KEY,
  });

  const response = await mg.messages
    .create(MAILGUN_DOMAIN, {
      from: MAILGUN_EMAIL_SENDER,
      to: MAILGUN_EMAIL_RECEIVER,

      //Subject and text data
      subject: "An inquiry from teamtedtile.com",
      html:
        "from email: " +
        req.body.email +
        "<br>" +
        "from phone number: " +
        req.body.tel +
        "<br>" +
        "message: " +
        req.body.message,
    })
    .catch((e) => {
      console.log(e);
      res.status(500).json(new Error("Problem connecting with Mailgun"));
    });

  // @TODO - "fail" case
  res.status(200).json("success");
}
