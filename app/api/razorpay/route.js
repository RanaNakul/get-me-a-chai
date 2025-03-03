import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/db/connectDB";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { fetchUser } from "@/actions/userActions";

export const POST = async (req) => {
  await connectDB();
  let body = await req.formData();
  body = Object.fromEntries(body);

  let p = await Payment.findOne({ oid: body.razorpay_order_id });

  if (!p) {
    return NextResponse.json({ success: false, message: "Order ID not found" });
  }

  let u = await fetchUser(p.to_user);
  const secret = u.razorpaySecret;

  let x = validatePaymentVerification(
    {
      "order_id": body.razorpay_order_id,
      "payment_id": body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret
  );

  if (x) {
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: "true" },
      { new: true }
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${updatedPayment.to_user}?paymentdone=true`
    );
  } else {
    return NextResponse.json({
      success: false,
      message: "Paymet Verification Failed",
    });
  }
};
