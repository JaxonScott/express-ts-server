import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/User";
import { comparePassword } from "../utils/helpers";

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

passport.serializeUser((user, done) => {
  console.log("Serializing user...");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("Deserializing user...");
  console.log(id);
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("user not found");
    console.log(user);
    done(null, user);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

passport.use(
  new Strategy(
    {
      usernameField: "username",
    },
    async (username: string, password: string, done) => {
      try {
        //if user dosent pass email or password throw new error
        if (!username || !password) {
          throw new Error("missing credentials🔐");
        }
        //check db to see if theres a user with a matching username
        const userDB = await User.findOne({ username });
        //if not throw error
        if (!userDB) {
          throw new Error("User not found 🚫");
        }
        //if there is compare the raw password to the users hashed password in the db
        const isValid = comparePassword(password, userDB.password);
        if (isValid) {
          console.log("Authenticated successfully 👍");
          done(null, userDB);
        } else {
          console.log("authentication failed 👎");
          done(null, null);
        }
      } catch (err) {
        console.log(err);
        done(err, null);
      }
    }
  )
);
