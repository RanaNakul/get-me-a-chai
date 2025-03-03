"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const initiate = async (amount, currentUser, paymentForm) => {
  await connectDB();

  var instance = new Razorpay({
    key_id: currentUser.razorpayKey,
    key_secret: currentUser.razorpaySecret,
  });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let x = await instance.orders.create(options);

  await Payment.create({
    amount: amount / 100,
    to_user: currentUser.username,
    oid: x.id,
    user: paymentForm.name,
    message: paymentForm.message,
  });

  return x;
};

export const fetchUser = async (username) => {
  await connectDB();
  // console.log("username: ", username);
  let u = await User.findOne({ username: username });
  // console.log("u: ", u);
  if (!u) {
    return { error: "User not found" };
  }
  let user = u.toObject({ flattenObjectIds: true });
  // console.log("user: ", user);
  // user.razorpaySecret = null;
  return user;
};

export const updateProfile = async (data, oldUserName) => {
  await connectDB();
  // console.log("data: ", data);

  if (oldUserName !== data.username) {
    let u = await User.findOne({ username: data.username });
    if (u) {
      return { error: "Username already exists" };
    }
  }
  await User.updateOne({ email: data.email }, data);

  await Payment.updateMany({ to_user: oldUserName }, { to_user: data.username });
  
};

export const fetchPayment = async (username) => {
  try {
    await connectDB();
    let p = await Payment.find({
      to_user: username,
      done: true,
      message: { $ne: "" },
    }).sort({ amount: -1 }).limit(10);
    let payments = p.map((payment) =>
      payment.toObject({ flattenObjectIds: true })
    );
    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return []; // Return empty array on error
  }
};

export const fetchTotalPayment = async (username) => {
  try {
    await connectDB();
    let p = await Payment.find({
      to_user: username,
      done: true,
    })
    let payments = p.map((payment) =>
      payment.toObject({ flattenObjectIds: true })
    );
    return payments;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return []; // Return empty array on error
  }
};
