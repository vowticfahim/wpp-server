import { JwtPayload } from "jsonwebtoken";

declare module 'sslcommerz-lts' {
    const sslcommerz: any;
    export default sslcommerz;
  }

declare global{
    namespace Express{
        interface Request{
            user?: JwtPayload
        }
    }
}