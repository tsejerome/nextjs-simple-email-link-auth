import * as sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendMail = async (msg: sgMail.MailDataRequired | sgMail.MailDataRequired[] = {
  to: process.env.FROM_EMAIL, // Change to your recipient
  from: process.env.FROM_EMAIL, // Change to your verified sender
  subject: 'Please contact admin',
  text: 'Bruh',
  html: '<strong>Bruh</strong>',
}) => {
  await sgMail
    .send(msg)
    .then((response) => {
      console.log('send success!')
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.error(error)
    })
}

const sendEmailMagicLink = async (email, secrete) => {
  const link = process.env.API_URL + `/apis/magicLink?email=${email}&s=${secrete}`
  console.log('link')
  console.log(link)
  await sendMail({
    to: email,
    from: process.env.FROM_EMAIL,
    subject: `Your magic link for ${process.env.APP_NAME}`,
    html: `Here is your magic link for logging into ${process.env.APP_NAME}: <a href="${link}">${link}</a> <br/><br/> Made with love by ${process.env.AUTHOR_NAME}`
  })
  return;
}



export { sendMail, sendEmailMagicLink }