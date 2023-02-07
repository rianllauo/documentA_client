import React, { useState } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";

const Register = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      name: "",
      password: "",
      confPassword: "",
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

         const response = await axios.post(
            "http://localhost:5000/register",
            user
         );
         console.log(response);
         navigate("/login");
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
            <h1 className="text-2xl font-medium">Register</h1>
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="nama" value="Nama" />
               </div>
               <TextInput
                  id="nama"
                  name="name"
                  type="nama"
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
                  id="password1"
                  type="password"
                  required={true}
                  onChange={handleChange}
               />
            </div>

            <div>
               <div className="mb-2 block">
                  <Label htmlFor="password1" value="Confirmasi Password" />
               </div>
               <TextInput
                  name="confPassword"
                  id="password1"
                  type="password"
                  required={true}
                  onChange={handleChange}
               />
            </div>

            <Button type="submit">Register</Button>
            <div className="text-center">
               <p className="text-sm">
                  Sudah punya akun? <Link to="/login">Login</Link>{" "}
               </p>
            </div>
         </form>
      </div>
   );
};

export default Register;
