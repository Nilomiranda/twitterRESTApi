const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('handlebars');
const htmlToText = require('html-to-text');
const {
  host,
  port,
  user,
  pass,
  templatesPath,
} = require('../../config/mail');

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass },
});

module.exports = ({ template, context, ...options }) => {
  // reading the received template
  let hbsTemplate; // declares a template variable

  /**
   * checks if a template was specified in the function
   * if YES, then reads the template file and compiles it,
   * together with its variables
   */
  if (template) {
    const file = fs.readFileSync(path.join(templatesPath, `${template}.hbs`), 'utf-8');
    hbsTemplate = hbs.compile(file)(context);
  }

  // define if the email will be sent directly with TEMPLATE or HTML
  const mailHtml = hbsTemplate || options.html;

  return transport.sendMail({
    ...options,
    html: mailHtml,
    text: htmlToText.fromString(mailHtml).trim(), // sends an email in pure text (good against SPAM)
  });
};
