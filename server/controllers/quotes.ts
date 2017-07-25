import BaseCtrl from "./base";
import Quote from "../models/quote.model";
import * as nodemailer from "nodemailer";

export default class QuotesCtrl extends BaseCtrl {
  model = Quote;

  private _transporter: nodemailer.Transporter;

  constructor() {
    super();
    this._transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9219eaa95ccbf7",
        pass: "6e4362af5ffad5"
      }
    });
  }

  sendQuoteEmail = (req, res) => {
    console.log('Sending email!!!');
    this.sendMail("billy@hello.com", "Quote Request", "Hi Bill, a quote has been requested for you. " + JSON.stringify(req.body));
    res.status(200).json({});
  }

  sendMail(to: string, subject: string, content: string, attachment: String) {
    const options = {
      from: 'jonny.cavell@gmail.com',
      to: to,
      subject: subject,
      text: content
      // ,
      // attachments: [
      //   {   // utf-8 string as an attachment
      //     filename: 'test.pdf',
      //     content: attachment
      //   }
      //   ]
    };

    this._transporter.sendMail(
      options, (error, info) => {
        if (error) {
          return console.log(`error: ${error}`);
        }
        console.log(`Message Sent ${info.response}`);
      });
  }
}


