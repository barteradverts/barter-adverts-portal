// Email templates for notifications

export const WelcomeEmail = ({ firstName, userType }: { firstName: string; userType: string }) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Barter Adverts</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Barter Adverts!</h1>
        </div>
        <div class="content">
            <h2>Hi ${firstName},</h2>
            <p>Welcome to India's first unified barter advertising marketplace! We're excited to have you join our community of ${userType === "advertiser" ? "innovative advertisers" : "media owners"}.</p>
            
            <h3>What's Next?</h3>
            <ul>
                <li>Complete your profile verification</li>
                <li>${userType === "advertiser" ? "Create your first barter offer" : "List your ad inventory"}</li>
                <li>Browse opportunities and start connecting</li>
                <li>Complete your first successful barter deal</li>
            </ul>
            
            <p>Need help getting started? Our team is here to support you every step of the way.</p>
            
            <a href="https://barteradverts.com/dashboard" class="button">Get Started</a>
            
            <p>Happy Bartering!<br>The Barter Adverts Team</p>
        </div>
    </div>
</body>
</html>
`

export const DealCompletedEmail = ({
  firstName,
  dealTitle,
  partnerName,
}: { firstName: string; dealTitle: string; partnerName: string }) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Deal Completed Successfully!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .success { background: #d1fae5; border: 1px solid #10b981; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Deal Completed!</h1>
        </div>
        <div class="content">
            <h2>Congratulations ${firstName}!</h2>
            
            <div class="success">
                <strong>Your barter deal "${dealTitle}" with ${partnerName} has been completed successfully!</strong>
            </div>
            
            <p>This is a great milestone in your barter advertising journey. We hope this partnership brings great value to your business.</p>
            
            <h3>What's Next?</h3>
            <ul>
                <li>Rate and review your partner</li>
                <li>Share your success story</li>
                <li>Explore new opportunities</li>
                <li>Refer friends to join the platform</li>
            </ul>
            
            <p>Thank you for being part of the Barter Adverts community!</p>
        </div>
    </div>
</body>
</html>
`
