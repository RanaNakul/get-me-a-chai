import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PaymentSchema = new Schema(
  {
    user: {
      type: String,
    },
    to_user: {
      type: String,
      required: true,
    },
    oid: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// module.exports = model("Payment", PaymentSchema);


const Payment = mongoose.models.Payment || model("Payment", PaymentSchema);

export default Payment;
