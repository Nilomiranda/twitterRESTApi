const path = require('path');

module.exports = {
  /**
   * Email authentication
   */
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,

  /**
   * Email templates path
   */
  templatesPath: path.resolve('./resources/mail'),
};
