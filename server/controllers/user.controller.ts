import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "./../utlis/jwt";
require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import userModel, { IUser } from "../models/user.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utlis/sendMail";
import { redis } from "../utlis/redis";
import { getUserById } from "../services/user.service";
import emailVerificationModel from "../models/emailVerification";
import { AuthError, DatabaseError, InternalError, ValidationError } from "../utlis/ErrorHandler";

interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
}

export const registrationUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return next(new ValidationError("Email already exist!"));
    }

    const user: IRegistrationBody = {
      name,
      email,
      password,
    };

    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

    const data = { user: { name: user.name }, activationCode };

    // Check if the email already exists in the database
    let emailVerification = await emailVerificationModel.findOne({ email });

    if (emailVerification) {
      // Update the existing document
      emailVerification.otp = activationCode;
      await emailVerification.save();
      console.log("Email updated");
    } else {
      // Create a new document
      await new emailVerificationModel({
        email,
        otp: activationCode,
      }).save();
      console.log("new Email added");
    }

    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/Activation-mail.ejs"),
      data
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "Activation-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email : ${user.email} to activate your account`,
        user
      });
    } catch (error: any) {
      return next(error);
    }
  } catch (error: any) {
    return next(error);
  }
}


interface IActivationToken {
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  return { activationCode };
};

interface IActivationRequest {
  email: string;
  name: string;
  password: string;
  activation_code: string;
}
export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { activation_code, email, name, password } =
      req.body as IActivationRequest;

    const newUser = await emailVerificationModel.findOne({
      email
    });

    if (!newUser) {
      return next(
        new ValidationError("Invalid user or activation code expired")
      );
    }

    if (newUser?.otp !== activation_code) {
      return next(new ValidationError("Invalid activation code"));
    }


    const existUser = await userModel.findOne({ email });

    if (existUser) {
      return next(new ValidationError("Email already Exist"));
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (error: any) {
    return next(error);
  }
}

// userlogin
interface ILoginRequest {
  email: string;
  password: string;
  role?: string;
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, role = 'user' } = req.body as ILoginRequest;

  if (!email || !password) {
    return next(new ValidationError("Missing required fields!"));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || role !== user.role) {
    return next(
      new AuthError("Invalid credentials!")
    );
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new AuthError("Invalid credentials!")
    );
  }

  sendToken(user, 200, res);
}


// user logout
export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Clear cookies
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    // Delete user session from Redis
    const userId = (req.user as { _id: string })._id || "";

    if (userId) {
      redis.del(userId);
    }

    // Send response
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    return next(error);
  }
}


// update access token
export const updateAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refresh_token = req.cookies.refresh_token as string;
    // console.log("call2")
    const decoded = jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN as string
    ) as JwtPayload;

    const message = "Could not refresh token";
    if (!decoded) {
      return next(new ValidationError(message));
    }

    const session = await redis.get(decoded.id as string);
    if (!session) {
      return next(new ValidationError(message));
    }

    const user = JSON.parse(session);

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN as string,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN as string,
      { expiresIn: "3d" }
    );

    req.user = user;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(200).json({
      status: "success",
      accessToken,
      refreshToken,
    });
  } catch (error: any) {
    return next(error);
  }
}


// get user info

export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.user as { _id: string })._id || "";
    getUserById(userId, res);
  } catch (error: any) {
    return next(error);
  }
}

// update user information

interface IUserUpdateInfo {
  name?: string;
  email?: string;
}

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email } = req.body as IUserUpdateInfo;
    const userId = (req.user as { _id: string })._id || "";
    const user = await userModel.findById(userId);

    if (email && user) {
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ValidationError("Email already exist"));
      }
      user.email = email;
    }
    if (name && user) {
      user.name = name;
    }
    await user?.save();

    await redis.set(userId, JSON.stringify(user));

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    return next(error);
  }
}


// update password
interface IUpdatePassword {
  oldpassword: string;
  newpassword: string;
}

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { oldpassword, newpassword } = req.body as IUpdatePassword;

    // Validate input
    if (!oldpassword || !newpassword) {
      return next(
        new ValidationError("Please enter both the old and new passwords")
      );
    }

    // Validate new password strength
    if (newpassword.length < 8) {
      return next(
        new ValidationError(
          "New password must be at least 8 characters long"

        )
      );
    }

    const user = await userModel
      .findById((req.user as { _id: string })._id)
      .select("+password");
    if (!user || !user.password) {
      return next(new ValidationError("Invalid user"));
    }

    // Check if old password matches
    const isPasswordMatched = await user.comparePassword(oldpassword);
    if (!isPasswordMatched) {
      return next(new ValidationError("Invalid old password"));
    }

    // Update password
    user.password = newpassword;
    await user.save();

    // Update user session in Redis
    try {
      await redis.set(
        (req.user as { _id: string })._id as string,
        JSON.stringify(user)
      );
    } catch (redisError) {
      return next(
        new DatabaseError("Error updating user session in Redis")
      );
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error: any) {
    return next(
      error
    );
  }
}

// Send Password Reset Email
export const sendPasswordResetEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body as { email: string };

    // Validate input
    if (!email) {
      return next(new ValidationError("Please enter your email address."));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(
        new ValidationError("No account found with that email address.")
      );
    }

    const secret = (user._id as string) + process.env.ACCESS_TOKEN;
    const token = jwt.sign({ userID: user._id }, secret, {
      expiresIn: "15m",
    });

    // Store reset token and expiration in database
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    await user.save();

    // Generate reset link
    const resetLink = `${process.env.FRONTEND_HOST}/account/reset-password-confirm/${user._id}/${token}`;
    console.log(resetLink); // Log the reset link for debugging

    const data = { user: { name: user.name }, resetLink };

    // Render the email template
    const html = await ejs.renderFile(
      path.join(__dirname, "../mails/Reset-password-mail.ejs"),
      data
    );

    try {
      await sendMail({
        email: user.email,
        subject: "Reset Your Password",
        template: "Reset-password-mail.ejs",
        data,
      });

      res.status(201).json({
        success: true,
        message: `A password reset link has been sent to ${user.email}. Please check your email.`,
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      return next(
        new InternalError(
          "Failed to send reset email. Please try again later."
        )
      );
    }
  } catch (error: any) {
    console.error("Error in password reset process:", error);
    return next(error);
  }
}

// Reset Password
interface IResetPassword {
  password: string;
  confirmPassword: string;
}
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password, confirmPassword } = req.body as IResetPassword;
    const { id, token } = req.params as { id: string; token: string };

    // Validate input
    if (!id || !token) {
      return next(
        new AuthError("Invalid request. Missing user ID or token.")
      );
    }

    // Validate new passwords
    if (!password || !confirmPassword) {
      return next(
        new ValidationError(
          "Please enter both the new password and confirmation password."
        )
      );
    }

    if (password !== confirmPassword) {
      return next(
        new ValidationError("The passwords do not match. Please try again.")
      );
    }

    // Validate new password strength
    if (password.length < 8) {
      return next(
        new ValidationError(
          "The new password must be at least 8 characters long."
        )
      );
    }

    // Find user by ID and check reset token
    const user = await userModel.findById(id);

    if (!user || !user.resetPasswordToken || !user.resetPasswordExpires) {
      return next(new AuthError("Invalid or expired reset token."));
    }

    // Check if the reset token is valid and not expired
    const secret = (user._id as string) + process.env.ACCESS_TOKEN;
    try {
      jwt.verify(token, secret);
    } catch (error) {
      return next(new AuthError("Invalid or expired reset token."));
    }

    if (user.resetPasswordExpires < new Date()) {
      return next(
        new ValidationError(
          "Reset token has expired. Please request a new password reset link."
        )
      );
    }

    if (user.resetPasswordToken !== token) {
      return next(
        new ValidationError(
          "Invalid reset token. Please request a new password reset link."
        )
      );
    }

    // Update the user's password
    user.password = password;
    user.resetPasswordToken = undefined; // Mark the token as used
    user.resetPasswordExpires = undefined; // Clear the expiration date
    await user.save();

    res.status(200).json({
      success: true,
      message: "Your password has been successfully reset.",
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return next(
        new ValidationError(
          "The reset link has expired. Please request a new password reset link."
        )
      );
    } else if (error.name === "JsonWebTokenError") {
      return next(
        new ValidationError(
          "The reset link is invalid. Please request a new password reset link."
        )
      );
    } else {
      return next(error)
    }
  }
}

