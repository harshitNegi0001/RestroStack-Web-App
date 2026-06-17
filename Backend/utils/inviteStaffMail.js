


export const createStaffInvitationMail = ({ token, owner_name,restaurant_name,role_name }) => {
    const join_link = `https://restro-stack.vercel.app/invite?token=${token}`
    const mail = `
    <!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', 'Segoe UI', Helvetica, Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }

        /* Updated Header for Email Compatibility */
        .header {
            background-color: #2fa312;
            padding: 30px;
            text-align: center;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
        }

        .restaurant-name {
            color: #ec7f03;
            font-weight: bold;
            font-size: 20px;
        }

        .btn {
            background-color: #1fbd27;
            color: #ffffff !important;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
        }

        .manual-section {
            background-color: #e3ffcc;
            padding: 20px;
            border-radius: 6px;
            border: 1px dashed #cccccc;
        }

        .token-box {
            font-family: monospace;
            font-size: 18px;
            color: #1a2e35;
            font-weight: bold;
            margin: 10px 0;
            letter-spacing: 1px;
        }

        .footer {
            background-color: #f4f4f4;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                    <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                                <td style="vertical-align: middle; padding-right: 10px;">
                                    <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png"
                                        alt="Logo" width="45" height="45"
                                        style="display: block; border: 0;object-fit: contain;">
                                </td>
                                <td style="vertical-align: middle;">
                                    <h1
                                        style="margin: 0; font-family: 'Betania Patmos', 'Georgia', serif; color: #ffffff; font-size: 24px;">
                                        RestroStack
                                    </h1>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>

        <div style="padding: 30px; text-align: center;">
            <p>🙏 Namaste!</p>
            <p>You have been invited to join the team at</p>
            <div class="restaurant-name">${restaurant_name}</div>
            <p>Position: <strong>${role_name}</strong></p>

            <div style="margin: 30px 0;">
                <p><strong>Option 1: Fast Join</strong></p>
                <a href="${join_link}" class="btn">Click to Join Team</a>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">(Link expires in 24 hours)</p>
            </div>

            <div style="margin: 30px 0; border-bottom: 1px solid #eeeeee; position: relative; height: 10px;">
                <span style="background: #fff; padding: 0 15px; color: #999; font-size: 14px;">OR</span>
            </div>

            <div class="manual-section">
            <p style="margin-top: 0;"><strong>Option 2: Join Manually</strong></p>
            <p style="font-size: 14px;">Go to <strong>restro-stack.vercel.app</strong> > Register/create <strong>New Account</strong>  > Select Role: <strong>Employee</strong> >
                Click <strong>"Join with Token"</strong> and paste this code:</p>


            <div
                style="margin: 15px 0; background-color: #ffffff; border: 2px solid #1fbd27; border-radius: 4px; padding: 10px;">
                <div style="font-size: 12px; color: #777; margin-bottom: 5px;">Double-tap to select token:</div>
                <div class="token-box"
                    style="margin: 0; background: #f0f0f0; padding: 8px; border-radius: 3px; border: 1px solid #ddd; user-select: all;">
                    ${token}
                </div>
            </div>

            <p style="font-size: 12px; color: #999;">(Token expires in 24 hours)</p>
        </div>
        
        <div class="footer">
            <p>This invitation was sent by ${owner_name} via <strong>RestroStack</strong>.</p>
            <p>&copy; 2026 RestroStack | <a href="#" style="color: #1a2e35;">Help Center</a></p>
        </div>
    </div>
</body>

</html>
    `
    return mail;
}