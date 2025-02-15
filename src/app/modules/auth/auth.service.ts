import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TLogin } from "./auth.interface";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import config from "../../config";
import httpStatus from "http-status";
import jwt, { decode, JwtPayload, SignOptions } from 'jsonwebtoken'

const loginUserIntoDB = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email }).select("+password");

  // throwing error if user doesn't exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This is user doesn't exists");
  }

  // comparing password
  const hashedResult = await bcrypt.compare(payload.password, user.password);

  if (!hashedResult) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong credentials");
  }

  // creating jwt payload
  const jwtPayload = {
    userId: user._id as unknown as string,
    role: user.role,
  };

  // generating access token
  const accessToken = createToken(
    jwtPayload,
    config.access_secret as string,
    config.expires_in as SignOptions["expiresIn"]
  );
  const refreshToken = createToken(
    jwtPayload,
    config.refresh_secret as string,
    config.refresh_expires_in as SignOptions["expiresIn"]
  );

  user.password = "";



  return {accessToken, refreshToken, user};
};


const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.refresh_secret as string
  ) as JwtPayload;

  
  const { userId, iat } = decoded;
  
  // checking if the user is exist
  const user = await User.findById(userId);


  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
  }

  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken  = createToken(
    jwtPayload,
    config.access_secret as string,
    config.expires_in as SignOptions["expiresIn"]
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUserIntoDB,
  refreshToken
};
