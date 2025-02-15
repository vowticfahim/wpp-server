import SSLCommerzPayment from "sslcommerz-lts";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import config from "../../config";

export const initiatePayment = async (paymentData: any) => {
  try {
    const data = {

      total_amount: paymentData.totalPrice,
      currency: "BDT",
      tran_id: paymentData.transactionId,
      success_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=failed`,
      cancel_url: `${config.server_api}/payment?transactionId=${paymentData.transactionId}&status=canceled`,
      ipn_url: `${config.server_api}/payment/ipn`,
      shipping_method: "Courier",
      product_name: "somehting",
      product_category: "Electronic",
      product_profile: "general",
      storeLogo: "https://i.ibb.co.com/hskdx8D/trade-hub.png",
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1000",
      cus_country: "Bangladesh",
      cus_phone: paymentData.customerPhone,
      cus_fax: "01711111111",
      ship_name: "Customer Name",
      ship_add1: "Dhaka",
      ship_add2: "Dhaka",
      ship_city: "Dhaka",
      ship_state: "Dhaka",
      ship_postcode: 1000,
      ship_country: "Bangladesh",
    };



    const sslcmz = new SSLCommerzPayment(
      config.store_id,
      config.store_pass,
      false
    );


    const GateWayPageURL = await sslcmz.init(data).then((apiResponse: any) => {
        return apiResponse.GatewayPageURL
    })

    return GateWayPageURL;


  } catch (error) {
    throw new AppError(
      httpStatus.EXPECTATION_FAILED,
      "Payment initiation failed!"
    );
  }
};
