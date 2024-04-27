"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router"; // Import corrected
import Link from "next/link";

interface User {
  email: string;
  password: string;
  username: string;
}

const SignupPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisabled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("Signup failed");
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setUser({
      ...user,
      [field]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="border border-gray-300 rounded-md mt-6 px-4 py-2 focus:outline-none focus:border-blue-500"
        id="username"
        value={user.username}
        onChange={(e) => handleInputChange(e, "username")} // Pass field name
        placeholder="username"
        type="text"
      />
      <input
        className="border border-gray-300 rounded-lg mt-6 px-4 py-2 focus:outline-none focus:border-blue-500"
        id="email"
        value={user.email}
        onChange={(e) => handleInputChange(e, "email")} // Pass field name
        placeholder="email"
        type="text"
      />

      <input
        className="border border-gray-300 rounded-md mt-6 px-4 py-2 focus:outline-none focus:border-blue-500"
        id="password"
        value={user.password}
        onChange={(e) => handleInputChange(e, "password")} // Pass field name
        placeholder="password"
        type="text"
      />
      <button
        onClick={onSignup}
        className="border border-gray-300 rounded-md mt-6 px-4 py-2 focus:outline-none focus:border-blue-500"
        disabled={buttonDisable}
      >
        {buttonDisable ? "No signup" : "Signup"}
      </button>
      <Link href="/login"> Visit login page</Link>
    </div>
  );
}

export default SignupPage;
