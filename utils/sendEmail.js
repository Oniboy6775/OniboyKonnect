import nodemailer from "nodemailer";
import handlebars from "handlebars";
import path from "path";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "node:fs";

const sendEmail = async ({ email, subject, payload, template }) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });

    const __dirname = dirname(fileURLToPath(import.meta.url));

    const source = readFileSync(path.join(__dirname, template), "utf8");

    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log("email sent");
        console.log(info);
        return true;
      }
    });
  } catch (error) {
    console.log("error sending mail");
    console.log(error);
    return false;
  }
};
export default sendEmail;
