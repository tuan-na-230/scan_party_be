require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const emailHandler = {
    async mySendMail(data, template) {
        let mailTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            },
            logger: true,
            debug: false
        })
        // let mailTransport = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: process.env.SMTP_PORT,
        //     auth: {
        //         user: process.env.SMTP_USER,
        //         pass: process.env.SMTP_PASS
        //     },
        //     logger: true,
        //     debug: false
        // })

        // mailTransport.use('compile', hbs({
        //     viewEngine: 'express-handlebars',
        //     // viewEngine: {
        //     //     partialsDir: 'templates/partials',
        //     //     extname: ".handlebars",
        //     //     layout: 'templates/layouts'
        //     // },
        //     viewPath: 'templates',
        //     extName: '.handlebars'
        // }));

        let { to, subject, text, html } = data
        if (!to) {
            throw new Error(`Missing info 'to'!`)
        }
        if (!subject) {
            throw new Error(`Missing info 'subject'!`)
        }

        await mailTransport.sendMail({
            from: '<Scan-party>',
            to,
            subject,
            text,
            html,
            template: 'index',
            context: {
                name: 'Accime Esterling'
            }
        }, (err, info) => {
            if (err) {
                console.error(err.message)
            } else {
                console.log({ message: 'Success!', info })
            }
        })
    },
    async sendMailVerifyEmail(data) {
        let dataSend = {
            to: data.email,
            subject: 'Confirm your email',
            text: 'For clients with plaintext support only',
            html: `
            <table style="width: 100%; background-color: #fff; border-top: 3px solid #ee82ee; display: flex; justify-content: center;">
                <tbody style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
                <tr>
                    <td>
                    <table
                        style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
                        <tr>
                            <td style="width: 100%; padding: 20px; display: flex; justify-content: center">
                                <p><img alt="gitLab"
                                    src="https://ci3.googleusercontent.com/proxy/h2NYYPjooDBPrKDR1zQTq8VZbRj-5HHNtmh6cIefmDw1EFVMWU_kKBDkDRm6kA6aB7A7oPzVOaGg5pojnHYkjAdBqT33loeozrDlnY61QksUAPjU0Pa2OPwYd-yncMbG-jlGPTHLE6Jc7W7pPt27LIzsfwWoWwRa-1Zwzw676VyUSWl10WGyHZc1kNA=s0-d-e1-ft#https://gitlab.com/assets/mailers/gitlab_header_logo-153749eaa7ea6fafcb995161abd3247bc4c4500f31498b0c4024f50093983ac0.gif"
                                    width="55" height="55" /></p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="width: 100%; background-color: #ff6347;text-align: center; margin: 0px 10px; border-radius: 5px; color: #fff">
                                <p>your scanparty.com account was created, click <a
                                        href="http://localhost:4000/api/v1/users/verify-email/${data._id}">here</a> to enabel your account</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 100%; text-align: left; padding: 20px 30px; border-radius: 5px; margin: 10px; background-color: #f0f2f5 ;">
                                <table style="width: 100%;">
                                    <tr>
                                        <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
                                            Email
                                        </th>
                                        <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
                                            ${data.email}</td>
                                    </tr>
                                    <tr>
                                        <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
                                            Password</th>
                                        <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
                                            *${data.password}</td>
                                    </tr>
                                    <tr>
                                        <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
                                            Time
                                        </th>
                                        <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
                                            ${Date.now()}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="color: #333333">
                                <p style="color: #333333; text-align: center;">copyright scanpaty.com</p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>`
        }
        await this.mySendMail(dataSend, 'index')
    },

    async sendMailResetPassword(data, newPassword) {
        let dataSend = {
            to: data.email,
            subject: 'New Password',
            text: 'For clients with plaintext support only',
            html: `
            <div style="padding:0;background-color:#fafafa;height:100%!important;margin:0 auto!important;width:100%!important">
                <div style="Margin:0 auto;max-width:650px; border: 1px solid black;">
                    <table style="border-collapse: collapse; margin: 0 auto; width: 100%; max-width: 650px; background-color: #4b2999">
                        <tbody>
                            <tr>
                                <img style="width: 100%; height: 300px; background-size: cover;" alt src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" />
                            </tr>
                            <tr>
                                <td style="padding:0;font-size:0;line-height:0">
                                    <table style="width: 80%; max-width: 570px; background-color: #4b2999; margin: 20px auto" >
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <img src="https://ci6.googleusercontent.com/proxy/eVeu8PAtVRIAtmuM6wcf60ybECiZqnMGAe12_oNPow5SJKm9KDGj1aUD67bZi3xERprrWOBmXQoe8nN9GTNCcRDLSPk6Hrci2_nf09dxk1Fp0sHu2_LEXANGnXtWQVv2uPCS4wefYwY=s0-d-e1-ft#https://static-assets.codecademy.com/marketing/email_assets/one_off/chatbots_2021.gif" />

                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:0;font-size:13px;line-height:0">
                                    <table style="width: 100%; max-width: 650px; background-color: #141c3a; margin: auto; color: white; text-align: center;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table style="margin: 30px auto; color: white; text-align: center;">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <p>Copyright c Scan Party. All rights reserved.</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>Our mailing address is:</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>575 Broadway, 5th Floor</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>New York City, NY 10012, USA</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>@copyright: scan-party</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>Your new password: ${newPassword}</p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <p>
                                                                        <a>fdfdsfdsfds</a> | <a>fjhdsfdsfdsf</a> | <a>adsfjhdsfhdsjf</a>
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`
        }
        await this.mySendMail(dataSend, 'index')
    }
}

module.exports = emailHandler