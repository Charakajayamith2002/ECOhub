
const { sender, client } = require("./mailtrap.config");
const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplate");

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {

        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification"

        })

        console.log(response);

    } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
};

const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {

        const response = await client.send({
            from: sender,
            to: recipient,
            template_uuid: "472dcd0e-80d0-4001-9854-847caddddc93",
            template_variables: {
                "company_info_name": "EcoPro",
                "name": name
            },
        });

        console.log(response);

    } catch (error) {
        
        console.log(error.message);
        throw new Error(error.message);

    }
};

module.exports = { sendVerificationEmail , sendWelcomeEmail };