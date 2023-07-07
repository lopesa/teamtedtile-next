/**
 * was trying to use this server action to send email,
 * instead of the route handler, but I don't see a way
 * of getting feedback from the api call, eg success or fail
 * of sending the email, so going to use the route handler:
 * /send-mail
 */

// "use server";

// import * as Sendgrid from "@sendgrid/mail";

// import type { NextApiRequest, NextApiResponse } from "next";
// import formData from "form-data";
// import Mailgun from "mailgun.js";
// import Error from "next/error";

// type SendMailProps = {
//   email: string;
//   telephone?: string;
//   message?: string;
// };

// const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
// const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
// const EMAIL_SENDER = "website@em1579.teamtedtile.com";
// const EMAIL_RECEIVER = "tony@lopesdesign.com"; // me for testing

// // export async function SendMail(
// //   req: NextApiRequest,
// //   res: NextApiResponse<"success" | "fail" | Error>
// // ) {
// export async function SendMail({ email, telephone, message }: SendMailProps) {
//   debugger;
//   // if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
//   //   return;
//   // }

//   if (!process.env.SENDGRID_API_KEY) {
//     return;
//   }

//   Sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

//   const msg = {
//     to: EMAIL_RECEIVER,
//     from: EMAIL_SENDER, // Use the email address or domain you verified above
//     subject: "An inquiry from teamtedtile.com",
//     text: "and easy to do anywhere, even with Node.js",
//     html:
//       "from email: " +
//       email +
//       "<br>" +
//       "from phone number: " +
//       telephone +
//       "<br>" +
//       "message: " +
//       message,
//   };

//   (async () => {
//     try {
//       await Sendgrid.send(msg);
//       return "success";
//     } catch (error: any) {
//       console.error(error);

//       if (error.response) {
//         console.error(error.response?.body);
//       }
//       return "error";
//     }
//   })();

//   //   const parsedBody = JSON.parse(req.body);
//   // return;

//   // const mailgun = new Mailgun(formData);
//   // const mg = mailgun.client({
//   //   username: "api",
//   //   key: MAILGUN_API_KEY,
//   // });

//   // const response = await mg.messages
//   //   .create(MAILGUN_DOMAIN, {
//   //     from: MAILGUN_EMAIL_SENDER,
//   //     to: MAILGUN_EMAIL_RECEIVER,

//   //     //Subject and text data
//   //     subject: "An inquiry from teamtedtile.com",
//   //     html:
//   //       "from email: " +
//   //       req.body.email +
//   //       "<br>" +
//   //       "from phone number: " +
//   //       req.body.tel +
//   //       "<br>" +
//   //       "message: " +
//   //       req.body.message,
//   //   })
//   //   .catch((e) => {
//   //     console.log(e);
//   //     res.status(500).json(new Error("Problem connecting with Mailgun"));
//   //   });

//   // // @TODO - "fail" case
//   // res.status(200).json("success");
// }
