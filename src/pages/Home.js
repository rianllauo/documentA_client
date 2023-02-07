import React, { useEffect, useState } from "react";
import { Label, TextInput, Button, Table } from "flowbite-react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
   const navigate = useNavigate();
   const [total, setTotal] = useState(0);
   const [data, setData] = useState({
      nama: "",
      alamat: "",
      telpon: "",
      harga1: Number(),
      harga2: Number(),
      total: total,
   });

   const handleChange = (e) => {
      setData({
         ...data,
         [e.target.name]: e.target.value,
      });
   };

   const handleChangeHarga1 = (e) => {
      setData({
         ...data,
         harga1: Number(e.target.value),
      });
   };

   const handleChangeHarga2 = (e) => {
      setData({
         ...data,
         harga2: Number(e.target.value),
      });
   };

   const handleChangeTotal = () => {
      setData({
         ...data,
         total: total,
      });
   };

   useEffect(() => {
      handleTotal();
   }, [data.harga1]);

   useEffect(() => {
      handleTotal();
   }, [data.harga2]);

   useEffect(() => {
      setData({
         ...data,
         total: total,
      });
   }, [total]);

   const handleTotal = () => {
      setTotal(data.harga1 + data.harga2);
   };

   const handleSubmit = useMutation(async (e) => {
      try {
         e.preventDefault();

         const response = await axios.post(
            "http://localhost:5000/product",
            data
         );

         refetch();
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   });

   const handleDelete = async (e, id) => {
      try {
         e.preventDefault();
         const response = await axios.delete(
            `http://localhost:5000/product/${id}`
         );
         console.log(response);
         refetch();
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogout = async (e, id) => {
      try {
         e.preventDefault();
         const response = await axios.delete(`http://localhost:5000/logout`);
         console.log(response);
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   const { data: dataProduct, refetch } = useQuery("dataProduct", async () => {
      const response = await axios.get("http://localhost:5000/products");
      return response.data;
   });

   console.log(dataProduct);

   return (
      <div className="mt-20 max-w-screen-lg mx-auto">
         <form
            onSubmit={(e) => handleSubmit.mutate(e)}
            className="max-w-md mx-auto flex flex-col gap-4 mt-3"
         >
            <div className="flex justify-between">
               <h1 className="text-2xl font-medium">Form Input</h1>
               <Button onClick={handleLogout} className="bg-red-500">
                  Logout
               </Button>
            </div>
            <div>
               <div className="mb-2 block">
                  <Label htmlFor="nama" value="Masukan Nama" />
               </div>
               <TextInput
                  name="nama"
                  id="nama"
                  type="text"
                  placeholder="Masukan Nama"
                  required={true}
                  onChange={handleChange}
               />
            </div>

            <div>
               <div className="mb-2 block">
                  <Label htmlFor="alamat" value="Masukan alamat" />
               </div>
               <TextInput
                  name="alamat"
                  id="alamat"
                  type="text"
                  placeholder="Masukan alamat"
                  required={true}
                  onChange={handleChange}
               />
            </div>

            <div>
               <div className="mb-2 block">
                  <Label htmlFor="telpon" value="Masukan no telpon" />
               </div>
               <TextInput
                  name="telpon"
                  id="telpon"
                  type="number"
                  placeholder="Masukan no telpon"
                  required={true}
                  onChange={handleChange}
               />
            </div>

            <div className="flex w-full gap-5">
               <div className="w-full">
                  <div className="mb-2 block">
                     <Label htmlFor="harga1" value="Harga 1" />
                  </div>
                  <TextInput
                     name="harga1"
                     className="w-full"
                     id="harga1"
                     type="number"
                     placeholder="Harga 1"
                     required={true}
                     onChange={handleChangeHarga1}
                  />
               </div>

               <div className="w-full">
                  <div className="mb-2 block">
                     <Label htmlFor="harga2" value="Harga 2" />
                  </div>
                  <TextInput
                     name="harga2"
                     className="w-full"
                     id="harga2"
                     type="number"
                     placeholder="Harga 2"
                     onChange={handleChangeHarga2}
                  />
               </div>
            </div>
            <div className="w-full">
               <div className="mb-2 block">
                  <Label htmlFor="total" value="Total Harga" />
               </div>
               <TextInput
                  name="total"
                  id="total"
                  type="number"
                  value={total}
                  placeholder="Total Harga"
                  onChange={handleChangeTotal}
                  disabled="true"
               />
            </div>

            {/* <div>
               <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
               </div>
               <TextInput id="password1" type="password" required={true} />
            </div> */}

            <Button type="submit">Submit</Button>
         </form>

         <div className="mt-10">
            <Table>
               <Table.Head>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>Alamat</Table.HeadCell>
                  <Table.HeadCell>Telpon</Table.HeadCell>
                  <Table.HeadCell>Harga 1</Table.HeadCell>
                  <Table.HeadCell>Harga 2</Table.HeadCell>
                  <Table.HeadCell>Total</Table.HeadCell>
                  <Table.HeadCell>
                     <span className="sr-only">Edit</span>
                  </Table.HeadCell>
               </Table.Head>
               <Table.Body className="divide-y">
                  {dataProduct?.map((item) => (
                     <Table.Row
                        key={item.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                     >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                           {item.nama}
                        </Table.Cell>
                        <Table.Cell>{item.alamat}</Table.Cell>
                        <Table.Cell>{item.telpon}</Table.Cell>
                        <Table.Cell>{item.harga1}</Table.Cell>
                        <Table.Cell>{item.harga2}</Table.Cell>
                        <Table.Cell>{item.total}</Table.Cell>
                        <Table.Cell>
                           <button
                              onClick={(e) => handleDelete(e, item.id)}
                              className="font-medium text-red-600 hover:underline dark:text-blue-500"
                           >
                              Delete
                           </button>
                        </Table.Cell>
                     </Table.Row>
                  ))}
               </Table.Body>
            </Table>
         </div>
      </div>
   );
};

export default Home;
