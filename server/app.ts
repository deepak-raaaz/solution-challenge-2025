require("dotenv").config();
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import { errorMiddleware } from "./middleware/error";
import { rateLimit } from "express-rate-limit";
import userRouter from "./routes/user.route";
import passport from "passport";
import './config/google.strategy'
import { accessTokenOptions, refreshTokenOptions } from "./utlis/jwt";
import promptRouter from "./routes/prompt.router";
import playlistsRouter from "./routes/playlists.router";
import LearningRoadmapRouter from "./routes/learning-roadmap.router";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

// cors = cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// api request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

app.use("/api/v1", userRouter);
app.use("/api/v1", promptRouter)
app.use("/api/v1", playlistsRouter);
app.use("/api/v1", LearningRoadmapRouter);


//google auth route
app.get('/auth/google',
  passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_HOST}/signin` }),
  function (req, res) {
    // Successful authentication, redirect home.
    const { user, accessToken, refreshToken } = req.user as any;

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.redirect(`${process.env.FRONTEND_HOST}`);
  });




// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(limiter);
app.use(errorMiddleware);
