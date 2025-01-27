import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
import { objectToArray } from "../../helper/ResponseHandler";
import { toast } from "react-toastify";

const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = ["name", "percentage"];
const headings = ["Product Name", "Tax %"];

export default function Purchase() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");

  const addProductHandler = () => {
    const newProduct = products?.find((ele) => ele._id === currProduct);
    setSelectedProducts(objectToArray(inventoryResponseKeys, [newProduct]));
  };
  const getStock = () => {
    axios({
      method: "get",
      url: baseurl + "products",
    })
      .then((res) => {
        setProducts(res.data);
        // setSelectedProducts([res.data]);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data || "");
      });
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <div className="mt-4">
      <form>
        <div className="space-y-12">
          <div className="grid grid-cols-6 gap-x-6 gap-y-8">
            <div className="col-span-2">
              <label className="block text-lg font-medium text-white">
                Supplier's Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-white"
              >
                Supplier GST
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-white"
              >
                Date
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-lg font-medium text-white">
                Product
              </label>
              <select
                name="product"
                value={currProduct}
                onChange={(event) => {
                  setCurrProduct(event.target.value);
                }}
                className="block w-full mt-2 rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">select</option>
                {products?.map((item, i) => {
                  return (
                    <option key={i} value={item?._id}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-lg font-medium text-white">
                Quantity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="col-span-2">
              <button
                type="button"
                className="rounded-xl px-6 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
                onClick={addProductHandler}
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="mt-2">
        <Table headings={headings} data={selectedProducts} />
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="rounded-xl px-12 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
        >
          Create Purchase
        </button>
      </div>
    </div>
  );
}
