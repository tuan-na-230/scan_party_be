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

        mailTransport.use('compile', hbs({
            viewEngine: 'express-handlebars',
            viewPath: './templates/'
        }));

        let { to, subject, text, html } = data
        if (!to) {
            throw new Error(`Missing info 'to'!`)
        }
        if (!subject) {
            throw new Error(`Missing info 'subject'!`)
        }

        await mailTransport.sendMail({
            from: 'Scan Party',
            to,
            subject,
            text,
            // html,
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
    // async sendMailWhenCreateProduct(data) {
    //     let listEmail = await user.findEmailOfUser()
    //     for (let i = 0; i < listEmail.length; i++) {
    //         const element = listEmail[i]
    //         let dataSend = {
    //             to: element.email,
    //             subject: 'Sản phẩm mới',
    //             text: "Sản phẩm mới",
    //             html: `
    //             <h3>${data.name}</h3>
    //             <p>${data.price}</p>
    //             <img src="${data.image}" alt="img"/>`
    //         }
    //         this.sendMail(dataSend)
    //     }
    // },
    async sendMailVerifyEmail(data) {
        let dataSend = {
            to: data.email,
            subject: 'Confirm your email 123',
            text: 'For clients with plaintext support only',
            // html: `
            // <table style="width: 100%; background-color: #fff; border-top: 3px solid #ee82ee; display: flex; justify-content: center;">
            //     <tbody style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
            //     <tr>
            //         <td>
            //         <table
            //             style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
            //             <tr>
            //                 <td style="width: 100%; padding: 20px; display: flex; justify-content: center">
            //                     <p><img alt="gitLab"
            //                         src="https://ci3.googleusercontent.com/proxy/h2NYYPjooDBPrKDR1zQTq8VZbRj-5HHNtmh6cIefmDw1EFVMWU_kKBDkDRm6kA6aB7A7oPzVOaGg5pojnHYkjAdBqT33loeozrDlnY61QksUAPjU0Pa2OPwYd-yncMbG-jlGPTHLE6Jc7W7pPt27LIzsfwWoWwRa-1Zwzw676VyUSWl10WGyHZc1kNA=s0-d-e1-ft#https://gitlab.com/assets/mailers/gitlab_header_logo-153749eaa7ea6fafcb995161abd3247bc4c4500f31498b0c4024f50093983ac0.gif"
            //                         width="55" height="55" /></p>
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td
            //                     style="width: 100%; background-color: #ff6347;text-align: center; margin: 0px 10px; border-radius: 5px; color: #fff">
            //                     <p>your scanparty.com account was created, click <a
            //                             href="http://localhost:4000/api/v1/users/verify-email/${data._id}">here</a> to enabel your account</p>
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td style="width: 100%; text-align: left; padding: 20px 30px; border-radius: 5px; margin: 10px; background-color: #f0f2f5 ;">
            //                     <table style="width: 100%;">
            //                         <tr>
            //                             <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
            //                                 Email
            //                             </th>
            //                             <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
            //                                 ${data.email}</td>
            //                         </tr>
            //                         <tr>
            //                             <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
            //                                 Password</th>
            //                             <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
            //                                 *${data.password}</td>
            //                         </tr>
            //                         <tr>
            //                             <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
            //                                 Time
            //                             </th>
            //                             <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
            //                                 ${Date.now()}</td>
            //                         </tr>
            //                     </table>
            //                 </td>
            //             </tr>
            //             <tr>
            //                 <td style="color: #333333">
            //                     <p style="color: #333333; text-align: center;">copyright scanpaty.com</p>
            //                 </td>
            //             </tr>
            //         </table>
            //         </td>
            //     </tr>
            //     </tbody>
            // </table>`
        }
        await this.mySendMail(dataSend, 'index')
    }
}

module.exports = emailHandler