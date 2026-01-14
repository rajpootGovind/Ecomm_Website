import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Nice icons for the password
import { motion } from "motion/react";

function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Watch password to compare with confirmPassword
  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      // Axios stores the server response in .data
      if (response.data.success) {
        alert("Signup Successfully");
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("error:", error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-w-100 items-center justify-center min-h-screen bg-gray-50 p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-xl shadow-lg border p-8"
        animate={{ x: 600, rotate: 360, scale: 1.2 }}
        transition={{ delay: 2, duration: 2 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Create an Account</h2>
          <p className="text-gray-500 text-sm">
            Enter your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* NAME FIELD */}
          <div className="space-y-1">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              className={
                errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
              }
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 letters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* EMAIL FIELD */}
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className={
                errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
              }
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD FIELD */}
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={errors.confirmPassword ? "border-red-500" : ""}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === passwordValue || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
