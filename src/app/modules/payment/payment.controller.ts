import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { paymentServices } from "./payment.service";

const confirmation = catchAsync(async(req: Request, res: Response)=> {
    const {transactionId, status} = req.query;

    const result = await paymentServices.confirmationService(transactionId as string, status as string)

    res.send(result);
})

export const paymentControllers = {
    confirmation
}