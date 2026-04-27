import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

const defaultTasks = [
  { id: '1', title: 'Study: JavaScript Arrays', type: 'topic', completed: false },
  { id: '2', title: 'Solve: Reverse a String', type: 'question', completed: false },
  { id: '3', title: 'Solve: FizzBuzz', type: 'question', completed: false },
];

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://careerforge-8dxk.onrender.com/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            const newUser = new User({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
              todayTasks: defaultTasks,
              weeklyProgress: [0,0,0,0,0,0,0],
              badges: [],
            });
            await newUser.save();
            user = newUser;
          }
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        return done(null, { token });
      } catch (err) {
        console.error("Passport error:", err);
        return done(err, null);
      }
    },
  ),
);

export default passport;