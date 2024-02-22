import Users, { UserD } from "../models/users";
import passport from "passport";

import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import { Strategy as LocalStrategy, Strategy } from "passport-local";
import bcrypt from "bcrypt";

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        const isuserexist = await Users.findOne({ email: email });

        if (isuserexist)
          return done("the user is exist try to use other email");
        const user = await Users.create({ email, password });

        return done(null, user);
      } catch (err: any) {
        done(err.message);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log(email);
        const user: any = await Users.findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = bcrypt.compare(password, user.password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.authenticate(
  new JwtStrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
