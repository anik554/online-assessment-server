import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedEmployerAdmin = async () => {
  try {
    const isAdminExist = await User.findOne({ email: envVars.EMPLOYER_EMAIL });

    if (isAdminExist) {
      console.log("Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcryptjs.hash(
      envVars.EMPLOYER_PASSWORD,
      Number(envVars.BCRYPT_SOLT_ROUND),
    );

    const payload: IUser = {
      name: "Employer admin",
      role: Role.EMPLOYER,
      email: envVars.EMPLOYER_EMAIL,
      password: hashedPassword,
    };

    const employerAdmin = await User.create(payload);
    console.log("Employer Admin Created Successfuly! \n");
    console.log(employerAdmin);
  } catch (error) {
    console.log(error);
  }
};
