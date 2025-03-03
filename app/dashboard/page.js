"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Btn from "@/components/common/Btn";
import { fetchUser, updateProfile } from "@/actions/userActions";
import { Bounce, toast } from "react-toastify";

const Dashboard = () => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Dashboard - Get Me A Chai";
    if (status === "loading") return; // Check loading first
    if (!session) {
      router.push("/login");
      return;
    }

    const getData = async () => {
      try {
        const u = await fetchUser(session.user.username);
        setValue("name", u.name);
        setValue("email", u.email);
        setValue("username", u.username);
        setValue("profilepic", u.profilepic);
        setValue("coverpic", u.coverpic);
        setValue("razorpayKey", u.razorpayKey);
        setValue("razorpaySecret", u.razorpaySecret);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, [status, session, router, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data, session.user.username);
      await update();
      toast("Profile updated successfully", {
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
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Error updating profile. Please try again.", {
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
  };

  if (!session) return null;

  return (
    <>
      
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-center pt-10">
          Welcome to your Dashboard
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto px-5 sm:px-0 pb-20 py-10 flex flex-col gap-4"
        >
          {/* Rest of the form code remains the same */}
          <label className="block ">
            Name
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </label>

          <label className="block ">
            <div>Email</div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </label>

          <label className="block ">
            Username
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
          </label>

          <label className="block ">
            Profile Picture URL
            <input
              type="text"
              {...register("profilepic", {
                required: "Profile Picture URL is required",
              })}
              placeholder="Enter profile picture URL"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.profilePicture && (
              <p className="text-red-500">{errors.profilePicture.message}</p>
            )}
          </label>

          <label className="block ">
            Cover Picture URL
            <input
              type="text"
              {...register("coverpic", {
                required: "Cover Picture URL is required",
              })}
              placeholder="Enter cover picture URL"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.coverPicture && (
              <p className="text-red-500">{errors.coverPicture.message}</p>
            )}
          </label>

          <label className="block ">
            Razorpay Key
            <input
              type="text"
              {...register("razorpayKey", {
                required: "Razorpay Key is required",
              })}
              placeholder="Enter Razorpay key"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.razorpayKey && (
              <p className="text-red-500">{errors.razorpayKey.message}</p>
            )}
          </label>

          <label className="block pb-5">
            Razorpay Secret
            <input
              type="password"
              {...register("razorpaySecret", {
                required: "Razorpay Secret is required",
              })}
              placeholder="Enter Razorpay secret"
              className="w-full p-3 rounded-lg bg-slate-800"
            />
            {errors.razorpaySecret && (
              <p className="text-red-500">{errors.razorpaySecret.message}</p>
            )}
          </label>

          <Btn
            text="Save"
            type="submit"
            customClass="text-base font-normal py-[2px]"
          />
        </form>
      </div>
    </>
  );
};

export default Dashboard;
