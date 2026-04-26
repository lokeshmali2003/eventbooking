const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { use } = require('react');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendBookingEmail = async (userEmail, userName, eventTitle) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `Booking Confirmed: ${eventTitle}`,
            html: `<h2>Hi ${userName}</h2>
            <p>Your booking for the event <strong>${eventTitle}</strong> is Successfully Confirmed</p>
            `
        };
        await transporter.sendMail(mailOptions);
        console.log('Email Sent Successfully to', userEmail);
    } catch (error) {
        console.error('Error Sending Email:', error);
    }
};

const sendOtpEmail = async (email, otp, type) => {
    try {
        const title = type === 'account_verification' ? 'Verify your Booking Account' : 'Booking Verified';
        const msg = type === 'account_verification' ? 'Please use the Following Otp to Verify your New Account' : 'Please use  the Following otp to verify and confirm your Event Booking';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: title,
            html: `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    
    <h2 style="color: #111;">
        ${title}
    </h2>

    <p style="color: #555; font-size: 16px;">
        ${msg}
    </p>

    <div style="margin: 20px auto; padding: 15px; font-size: 24px; font-weight: bold;">
        ${otp}
    </div>

    <p style="color: #999; font-size: 12px;">
        This code expires in 5 minutes
    </p>

</div>`
        };

        await transporter.sendMail(mailOptions);
        console.log(`OTP email sent to ${userEmail} for ${type}`);
    }
    catch (error) {
        console.error(`Error Sending OTP email`, error);
    }
};

module.exports = { sendBookingEmail, sendOtpEmail};