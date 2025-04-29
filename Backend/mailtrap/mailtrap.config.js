const { MailtrapClient } = require("mailtrap");
const dotenv = require("dotenv");

dotenv.config();

const client = new MailtrapClient({ endpoint: process.env.MAILTRAP_ENDPOINT, token: process.env.MAILTRAP_TOKEN });

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Tharindu",
};

module.exports = { client, sender };