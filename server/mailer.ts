import nodemailer from 'nodemailer'

export function sendConfirmationEmail({email, hash}: {email: string, hash: string}) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      service: 'gmail',
      auth: {
        type: "OAUTH2",
        user: process.env.GMAIL_LOGIN,
        pass: process.env.GMAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.JWT_ACCESS_SECRET,
        accessToken: process.env.JWT_REFRESH_SECRET,
      }
    })
    const message = {
      from: process.env.GMAIL_LOGIN,
      // to: userTo.email // for PRODUCTION
      to: email,
      subject: 'Learn Platform',
      html: `
        <h3>Dear ${email.split('@')[0]}</h3>
        <p>Thanks you for registered intro out platform</p>
        <p>To activate your account please follow this link! <a target="_" href="${process.env.API_URL}/api/auth/activate/${hash}">Activate link</a></p>
        <p>Cheers,</p>
        <p>You application team</p>
      `
    }
    transporter.sendMail(message, function(err, info) {
      if (err) {
        console.log('err', err)
        rej(err)
      } else {``
        res(info)
      }
    })
  })
}
