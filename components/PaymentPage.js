"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { fetchPayment, fetchTotalPayment, fetchUser, initiate } from "@/actions/userActions";
import Btn from "./common/Btn";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  const { date: session } = useSession();
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      let u = await fetchUser(username);
      setCurrentUser(u);
      if (u.error) {
        toast("Wrong URL!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);

      }
      let dbPayments = await fetchPayment(username);
      let totalPayments = await fetchTotalPayment(username);
      setPayments(dbPayments);
      setTotalPayments(totalPayments);
    };
    getData();
  }, [router, username]);

  useEffect(() => {
    if (searchParams.get("paymentdone") == "true") {
      toast("Thanks for your donation 💗", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    router.push(`/${username}`);
  }, [router, searchParams, username]);

  const [paymentForm, setPaymentForm] = useState({
    name: "",
    message: "",
    amount: "",
  });

  // console.log("session: ", session);

  const initializeRazorpay = async (amount) => {
    amount = amount * 100;
    if (typeof window?.Razorpay === "undefined") {
      return alert("Razorpay SDK failed to load. Are you online?");
    }

    let initiatePayment = await initiate(amount, currentUser, paymentForm);

    const options = {
      key: currentUser.razorpayKey,
      amount: amount,
      currency: "INR",
      name: "Get Me A Chai",
      description: "Test Transaction",
      image: "/tea.gif",
      order_id: initiatePayment.id,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/razorpay`,
      prefill: {
        name: `"Gaurav Kumar"`,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
      //   handler: function (response) {

      //     console.log("response: ",response)

      //     alert(response.razorpay_payment_id);
      //     // Handle payment success
      //   },
    };

    try {
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Payment failed to initialize. Please try again.");
    }
  };

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  const handlerChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="relative  w-full h-[170px] sm:h-[250px] md:h-[350px] bg-black flex justify-center items-center ">
        {
          // Cover Image
          currentUser.coverpic ? (
            <Image
              className="object-cover"
              fill
              src={currentUser.coverpic}
              alt="cover-image"
              priority
            />
          ) : (
            <div className="font-sans font-medium text-2xl tracking-[5px]">
              empty
            </div>
          )
        }

        {/* Profile Image */}
        <div className=" absolute bottom-0 left-[50%] -translate-x-[50%] translate-y-[50%] border-2 rounded-full border-white">
          <Image
            className=" rounded-full w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] "
            src={
              currentUser.profilepic
                ? currentUser.profilepic
                : "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            }
            alt="profile-image"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="py-10 sm:py-16 flex flex-col items-center gap-2">
        <div className=" font-bold text-base sm:text-lg">@{username}</div>
        <div className="text-sm sm:text-base text-slate-400">
          Let help {username} to get a chai!
        </div>
        <div className="text-sm sm:text-base text-slate-400">
          {totalPayments.length} people have donated ₹
          {totalPayments.reduce((a, b) => a + b.amount, 0)}
        </div>

        <div className="payment flex flex-col lg:flex-row gap-3 w-[80%] pt-10">
          {/*Supporters */}
          <div className="supporters lg:w-1/2 bg-slate-900 rounded-lg p-10">
            <h2 className="text-xl sm:text-2xl font-bold pb-5 md:py-5">Top 10 Supporters</h2>
            <ul className="flex flex-col gap-4 md:pl-5 text-lg">
              {payments.length === 0 ? (
                <div className="text-sm md:text-base text-center">No Supporters Yet</div>
              ) : (
                payments.map((payment, i) => (
                  <li key={i} className="text-sm md:text-base flex gap-2 items-center">
                    <Image
                      className="w-[23px] h-[23px] sm:w-[33px] sm:h-[33px] rounded-full"
                      src="./avatar.gif"
                      alt="tea gif"
                      width={33}
                      height={33}
                      unoptimized
                    />
                    <span>
                      {payment.user} donated{" "}
                      <span className=" font-bold">₹{payment.amount}</span> with
                      a message &quot;{payment.message}&quot;
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Make a Payment */}
          <div className="makePayment lg:w-1/2 bg-slate-900 rounded-lg p-10">
            <Script
              src="https://checkout.razorpay.com/v1/checkout.js"
              onLoad={handleScriptLoad}
            />

            <div>
              <h2 className="text-xl sm:text-2xl font-bold pb-5 md:py-5">Make a Payment</h2>
              <div className="flex flex-col gap-2 text-sm sm:text-base">
                <input
                  onChange={handlerChange}
                  value={paymentForm.name}
                  name="name"
                  type="text"
                  placeholder="Enter Name"
                  className="w-full p-3 rounded-lg bg-slate-800"
                />
                <textarea
                  onChange={handlerChange}
                  value={paymentForm.message}
                  name="message"
                  placeholder="Enter Message"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  maxLength={100}
                />
                <input
                  onChange={handlerChange}
                  value={paymentForm.amount}
                  type="number"
                  name="amount"
                  placeholder="Enter Amount"
                  className="w-full p-3 rounded-lg bg-slate-800"
                />
                <Btn
                  disabled={paymentForm.amount === ""}
                  onclick={() => initializeRazorpay(paymentForm.amount)}
                  text="Pay"
                  customClass=" text-base font-normal py-[2px]"
                />
              </div>
              {/* Or choose from these Amounts */}
              <div className="flex flex-wrap gap-2 pt-8 text-sm sm:text-base">
                <button
                  className="bg-slate-800 p-3 rounded-lg hover:bg-slate-600 duration-150 "
                  onClick={() => initializeRazorpay(10)}
                >
                  Pay ₹10
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg hover:bg-slate-600 duration-150 "
                  onClick={() => initializeRazorpay(20)}
                >
                  Pay ₹20
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg hover:bg-slate-600 duration-150 "
                  onClick={() => initializeRazorpay(30)}
                >
                  Pay ₹30
                </button>
                <button
                  className="bg-slate-800 p-3 rounded-lg hover:bg-slate-600 duration-150 "
                  onClick={() => initializeRazorpay(40)}
                >
                  Pay ₹40
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
