import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseFormData from "../../Custom Hooks/UseFormData";
import InputBox from "../../Components/InputBox";
import { useSearchParams } from "react-router-dom";

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
  purchasePrice: "",
  stock: "",
  weight: "",
  unit: "",
};
const units = ["gm", "kg", "ml", "li"];
const baseurl = process.env.REACT_APP_BASE_URL;
export default function EditProduct() {
  const [formData, handleChange, resetForm, changeAllData] =
    UseFormData(initialData);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
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
  const getProductById = (id) => {
    axios({
      method: "get",
      url: baseurl + "products/" + id,
    })
      .then((res) => {
        changeAllData({ ...res.data, taxId: res.data.tax_id });
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data || "");
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    axios({
      method: "put",
      url: baseurl + "products",
      data: { ...formData, id: id },
    })
      .then((response) => {
        console.log(response);
        // resetForm();
        toast.success("Product Edited");
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
    if (id) getProductById(id);
  }, []);
  return (
    <div>
      <form
        className="mt-10 grid grid-cols-4 gap-x-6 gap-y-4"
        onSubmit={submitHandler}
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
          label={"Weight"}
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
          label={"Purchase Price"}
          name="purchasePrice"
          value={formData.purchasePrice}
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
        <div className="flex justify-end col-span-2">
          <button
            type="submit"
            className="rounded-xl px-8 py-2 mt-4 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
          >
            Edit Product
          </button>
        </div>
      </form>
    </div>
  );
}
