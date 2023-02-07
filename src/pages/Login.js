import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const Login = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      name: "",
      password: "",
   });

   const handleChange = (e) => {
      setUser({
         ...user,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = useMutation(async (e) => {
      try {
         e.preventDefault();

         const response = await axios.post("http://localhost:5000/login", user);
         console.log(response);
         navigate("/dashboard");
      } catch (error) {
         console.log(error);
      }
   });

   console.log(user);

   return (
      <div className="w-full h-screen mx-auto bg-slate-100  flex items-center justify-center">
         <form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className="flex flex-col gap-4 w-[360px] p-6 rounded-md bg-white"
         >
            <h1 className="text-2xl font-medium">Login</h1>
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="nama" value="Nama" />
               </div>
               <TextInput
                  id="nama"
                  name="name"
                  type="text"
                  placeholder="Masukan Nama"
                  required={true}
                  onChange={handleChange}
               />
            </div>
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="password1" value="Password" />
               </div>
               <TextInput
                  name="password"
                  onChange={handleChange}
                  id="password1"
                  type="password"
                  required={true}
               />
            </div>

            <Button type="submit">Login</Button>
            <div className="text-center">
               <p className="text-sm">
                  Belum punya akun? <Link to="/register">Register</Link>{" "}
               </p>
            </div>
         </form>
      </div>
   );
};

export default Login;
