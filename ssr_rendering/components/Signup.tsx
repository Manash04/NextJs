"use client";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="p-4 border rounded pb-4">
          <input onChange={(e)=>{
            setEmail(e.target.value);
          }}
            className="p-2 m-2"
            type="text"
            placeholder="manash9787@gmail.com"
          ></input>
          <br />
          <input onChange={(e)=>{
            setPassword(e.target.value);
          }}
            className="p-2 m-2"
            type="password"
            placeholder="1234567"
          ></input>
          <div className="mt-4 flex justify-center">
            <button onChange={()=>[
                axios.post("http://localhost:3000/api/user",{
                    email,
                    password
                })
            ]}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
