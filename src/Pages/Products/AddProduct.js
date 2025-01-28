import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseFormData from "../../Custom Hooks/UseFormData";
import InputBox from "../../Components/InputBox";
const initialData = {
  name: "",
  brandName: "",
  taxId: "",
  category: "",
  supplier: "",
  hsn: "",
  uniqueId: "",
  mrp: "",
  sellingPrice: "",
  stock: "",
  weight: "",
  unit: "",
};
const units = ["gm", "kg", "ml", "li"];
const baseurl = process.env.REACT_APP_BASE_URL;
export default function AddProduct() {
  const [formData, handleChange, resetForm] = UseFormData(initialData);
  const [tax, setTax] = useState([]);
  const getTax = () => {
    axios({
      method: "get",
      url: baseurl + "master/tax",
    })
      .then((res) => {
        setTax(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data || "");
      });
  };

  const addProductHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axios({
      method: "post",
      url: baseurl + "products",
      data: formData,
    })
      .then((response) => {
        console.log(response);
        resetForm();
        toast.success("Product Added");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
        );
      });
  };
  useEffect(() => {
    getTax();
  }, []);
  return (
    <div>
      <form
        className="mt-10 grid grid-cols-4 gap-x-6 gap-y-4"
        onSubmit={addProductHandler}
      >
        <InputBox
          label={"Product Name"}
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <div className="col-span-2">
          <label className="block text-lg font-medium text-white">
            Tax Rate
          </label>
          <select
            name="taxId"
            value={formData.taxId}
            onChange={handleChange}
            className="block w-full rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">select</option>
            {tax?.map((item, i) => {
              return (
                <option key={i} value={item?._id}>
                  {item?.name}
                </option>
              );
            })}
          </select>
        </div>
        <InputBox
          label={"Brand Name"}
          name="brandName"
          value={formData.brandName}
          onChange={handleChange}
        />
        <InputBox
          label={"Category"}
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
        <InputBox
          label={"Weight (gms)"}
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          type={"number"}
        />
        <div className="col-span-2">
          <label className="block text-lg font-medium text-white">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="block w-full rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="">select</option>
            {units?.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <InputBox
          label={"Max Retail Price"}
          name="mrp"
          value={formData.mrp}
          onChange={handleChange}
          type={"number"}
        />
        <InputBox
          label={"Rate"}
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          type={"number"}
        />
        <InputBox
          label={"Supplier's Name"}
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
        />
        <InputBox
          label={"HSN"}
          name="hsn"
          value={formData.hsn}
          onChange={handleChange}
        />
        <InputBox
          label={"Stock"}
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          type={"number"}
        />
        <InputBox
          label={"Unique ID of Product"}
          name="uniqueId"
          value={formData.uniqueId}
          onChange={handleChange}
        />
        <div className="flex items-center col-span-2">
          <button
            type="submit"
            className="rounded-xl px-8 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
          >
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
}
