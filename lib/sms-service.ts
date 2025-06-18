import twilio from "twilio"

interface SMSConfig {
  accountSid: string
  authToken: string
  phoneNumber: string
}

class SMSService {
  private client: any
  private fromNumber: string
  private isConfigured: boolean

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const phoneNumber = process.env.TWILIO_PHONE_NUMBER

    this.isConfigured = !!(accountSid && authToken && phoneNumber)

    if (this.isConfigured) {
      this.client = twilio(accountSid, authToken)
      this.fromNumber = phoneNumber!
    }
  }

  async sendOTP(
    phoneNumber: string,
    otp: string,
    type: "registration" | "login" = "login",
  ): Promise<{
    success: boolean
    message: string
    demoOtp?: string
  }> {
    try {
      const message =
        type === "registration"
          ? `Welcome to BarterAds! Your verification code is: ${otp}. Valid for 5 minutes.`
          : `Your BarterAds login code is: ${otp}. Valid for 5 minutes.`

      if (this.isConfigured) {
        await this.client.messages.create({
          body: message,
          from: this.fromNumber,
          to: phoneNumber,
        })

        console.log(`OTP sent via Twilio to ${phoneNumber}`)

        return {
          success: true,
          message: "OTP sent successfully to your phone number",
        }
      } else {
        // Demo mode fallback
        console.log(`Demo OTP for ${phoneNumber}: ${otp}`)

        return {
          success: true,
          message: `Demo mode - OTP: ${otp}`,
          demoOtp: otp,
        }
      }
    } catch (error) {
      console.error("SMS sending error:", error)

      // Fallback to demo mode
      console.log(`Fallback OTP for ${phoneNumber}: ${otp}`)

      return {
        success: true,
        message: `SMS service unavailable - Demo OTP: ${otp}`,
        demoOtp: otp,
      }
    }
  }

  async sendWelcomeMessage(phoneNumber: string, firstName: string): Promise<void> {
    try {
      if (this.isConfigured) {
        await this.client.messages.create({
          body: `Hi ${firstName}! Welcome to BarterAds. Start exploring advertising opportunities now!`,
          from: this.fromNumber,
          to: phoneNumber,
        })

        console.log(`Welcome message sent to ${phoneNumber}`)
      }
    } catch (error) {
      console.error("Welcome message error:", error)
    }
  }

  async sendPINSetupConfirmation(phoneNumber: string): Promise<void> {
    try {
      if (this.isConfigured) {
        await this.client.messages.create({
          body: `Your 4-digit PIN has been set successfully! You can now use it for quick login to BarterAds.`,
          from: this.fromNumber,
          to: phoneNumber,
        })

        console.log(`PIN confirmation sent to ${phoneNumber}`)
      }
    } catch (error) {
      console.error("PIN confirmation error:", error)
    }
  }
}

export const smsService = new SMSService()
