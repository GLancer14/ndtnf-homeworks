import passportLocal from "passport-local";
import { container } from "../infrastructure/container.js";
import { UsersService } from "../users/users.service.js";

const LocalStrategy = passportLocal.Strategy;
const verify = async (username: string, password: string, done: any) => {
  const repo = container.get(UsersService);
  try {
    const user = await repo.findUserByName(username);
    if (!user || user.password !== password) {
      console.log("incorrect username or password");
      return done(null, false);
    }

    return done(null, user);
  } catch(e) {
    console.log(e);
    return done(e);
  }
};

const options = {
  usernameField: "username",
  passwordField: "password",
};

export default new LocalStrategy(options, verify);