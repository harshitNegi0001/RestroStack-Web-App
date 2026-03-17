

export const createOtpMail = (otp,sub,cstmMsg)=>{
    const mail =
`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Betania+Patmos&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Saira:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet">
    <title>${sub}</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Poppins, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td align="center" style="padding:40px 16px;align-items: center;">

                <table width="100%"
                    style="max-width:480px; background:#F0FDF4; border-radius:10px; padding:32px; box-shadow:0 8px 24px rgba(0,0,0,0.08);"
                    cellpadding="0" cellspacing="0">

                    <tr>
                        <td align="center" style="padding-bottom:10px;">
                            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png"
                                alt="RestroStack" style="height:70px;" />
                        </td>
                    </tr>

                    <tr>
                        <td align="center">
                            <h3 style="margin:0; color:#222; font-weight:600;">
                                ${sub}
                            </h3>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:16px 0; color:#555; font-size:14px; line-height:1.6;">
                            
                            ${cstmMsg}
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding:24px 0;">
                            <table cellpadding="0" cellspacing="0">
                                <tr>
                                    ${String(otp).split('').map(d => `
                                    <td style="
                      width:44px;
                      height:52px;
                      border:1px solid #ddd;
                      border-radius:6px;
                      text-align:center;
                      font-size:24px;
                      font-weight:600;
                      color:#111;
                      background:#bcf3ae88;
                      margin:0 4px;
                    ">
                                        ${d}
                                    </td>
                                    `).join('')}
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="color:#555; font-size:13px;">
                            This code will expire in <b>10 minutes</b>.
                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="padding-top:24px; color:#555; font-size:12px; line-height:1.5;">
                            If you did not request this, you can safely ignore this email.
                            <br /><br />
                            — Team <b style="font-family: Betania Patmos;color: #222522;">RestroStack</b>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>
</body>

</html>`

return mail;
}