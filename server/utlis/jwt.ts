require('dotenv').config();
import { IUser } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";

interface ITokenOptions{
    expires:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite:"lax" | "strict" | "none" | undefined ;
    secure?:boolean;
    path: string
}

 const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "1200",10
);

const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",10
);

export const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // Use 'none' for cross-site requests
    secure: true,     // Set to true for HTTPS in production
    path: "/"
};

export const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none", // Use 'none' for cross-site requests
    secure: true,     // Set to true for HTTPS in production
    path: "/"
};

export const sendToken = (user: any, statusCode: number, res:Response) =>{
    const accessToken = user.SignAcessToken();
    const refreshToken = user.SignRefreshToken();

    redis.set(user._id as any,JSON.stringify(user) as any);

    // if(process.env.NODE_ENV === 'producttion'){
    //     accessTokenOptions.secure = true;
    // }

    res.cookie("access_token",accessToken,accessTokenOptions);
    res.cookie("refresh_token",refreshToken,refreshTokenOptions);

    const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    }
    res.status(statusCode).json({
        success:true,
        userData,
        accessToken
    })
}

