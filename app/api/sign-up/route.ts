import { dbConnection } from "@/lib/dbConnectio";
import { UserModel } from "@/models/User";
import bcrypt from "bcryptjs";

import { sendverificationEmail } from "@/helpers/sendverificationEmail";

export const POST = async (request: Request) => {
  await dbConnection();
  try {
    const { username, email, password } = await request.json();

    // username already exist or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 },
      );
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    // email already exist or not
    const existingUserVerifiedByEmail = await UserModel.findOne({ email });
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exist",
          },
          { status: 400 },
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hashedPassword;
        existingUserVerifiedByEmail.verifyCode = verifyCode;
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(
          Date.now() + 3600000,
        );
        existingUserVerifiedByEmail.save();
      }
    } else {
      // make the passwords normal value to hashed value
      const hashedPassword = await bcrypt.hash(password, 10);
      // expity time
      const expiryData = new Date();
      expiryData.setHours(expiryData.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryData,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });

      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendverificationEmail(
      email,
      username,
      verifyCode,
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "User register successfull. please verify your email",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error registering user: ", error);
    return Response.json(
      {
        success: false,
        message: "Error Registering USer",
      },
      { status: 500 },
    );
  }
};
