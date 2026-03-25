


export const createStaffInvitationMain = ({ token, owner_name,restaurant_name,role_name }) => {
    const join_link = `https://restro-stack.vercel.app/invite?token=${token}`
    const mail = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Betania+Patmos&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&family=Saira:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .header { background-color: #1a2e35; display: flex;gap: 5px;align-items: center;justify-content: center; padding: 30px; text-align: center; color: #ffffff; }
        .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; }
        .content { padding: 30px; text-align: center; }
        .restaurant-name { color: #e67e22; font-weight: bold; font-size: 20px; }
        .btn-container { margin: 30px 0; }
        .btn { background-color: #e67e22; color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; box-shadow: 0 2px 5px rgba(0,0,0,0.2); }
        .divider { margin: 30px 0; border-bottom: 1px solid #eeeeee; position: relative; }
        .divider span { position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #fff; padding: 0 15px; color: #999; font-size: 14px; }
        .manual-section { background-color: #f9f9f9; padding: 20px; border-radius: 6px; border: 1px dashed #cccccc; }
        .token-box { font-family: monospace; font-size: 18px; color: #1a2e35; font-weight: bold; margin: 10px 0; letter-spacing: 1px; word-break: break-all; }
        .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; }
        .footer a { color: #1a2e35; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1773712565/dhd5mphtokjeobqrtafs.png" alt=""
            style="width: 45px; height: 45px; object-fit: contain;">
            <h1 style="font-family: 'Betania Patmos';">RestroStack</h1>
        </div>

        <div class="content">
            <p>🙏Namaste!</p>
            <p>You have been invited to join the team at</p>
            <div class="restaurant-name">${restaurant_name}</div>
            <p>Position: <strong>${role_name}</strong></p>

            <div class="btn-container">
                <p><strong>Option 1: Fast Join</strong></p>
                <a href="${join_link}" class="btn">Click to Join Team</a>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">(Link expires in 24 hours)</p>
            </div>

            <div class="divider">
                <span>OR</span>
            </div>

            <div class="manual-section">
                <p style="margin-top: 0;"><strong>Option 2: Join Manually</strong></p>
                <p style="font-size: 14px;">Go to <strong>RestroStack.in</strong> > Select Role: <strong>Employee</strong> > Click <strong>"Join with Token"</strong> and paste this code:</p>
                <div class="token-box">${token}</div>
            </div>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">(Token expires in 24 hours)</p>

        </div>

        <div class="footer">
            <p>This invitation was sent by ${owner_name} via <b style="font-family: 'Betania Patmos';">RestroStack</b>.</p>
            <p>&copy; 2026 RestroStack | 
                <a href="#">Help Center</a>
            </p>
        </div>
    </div>
</body>
</html>
    `
    return mail;
}