import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ecommerceproject12345@gmail.com",
    pass: "qega gdgf atvr cpku",
  },
});

async function sendPasswordResetEmail(email, resetLink) {
  try {
    const mailOptions = {
      from: "ecommerceproject12345@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<p>Click the following link to reset your password.<br><a href="${resetLink}">Reset Password</a></p>`,
    };

    await transporter.sendMail(mailOptions);

    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

export { sendPasswordResetEmail };
