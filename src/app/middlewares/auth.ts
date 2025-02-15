import config from "../config";
import AppError from "../errors/AppError";
import { TRole } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../modules/user/user.model";


export const auth = (...roles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }

    const decoded = jwt.verify(
        token as string,
        config.access_secret as string
    ) as JwtPayload

    const {role, userId, iat} = decoded;


    const user = await User.findById(userId);

    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }


    if(roles && !roles.includes(role)){
        throw new AppError(httpStatus.NOT_FOUND, 'You have no access to this route');
    }

    req.user = decoded as JwtPayload;

    next();

  });
};
