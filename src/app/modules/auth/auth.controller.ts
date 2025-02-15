import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";

const loginUser = catchAsync(async(req, res) => {
    const result = await AuthServices.loginUserIntoDB(req.body);

    res.cookie('access-token', result.accessToken)
    res.cookie('refresh-token', result.refreshToken)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: result,
        
      });
})
const refreshToken = catchAsync(async(req, res) => {
    const refreshToken = req.headers.cookies;
    const result = await AuthServices.refreshToken(refreshToken as string);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Access token retrieved successfully!",
        data: result,
      });
})

export const AuthController = {
    loginUser,
    refreshToken
}