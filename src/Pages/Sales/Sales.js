import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
import { objectToArray } from "../../helper/ResponseHandler";
import { toast } from "react-toastify";
import UseFormData from "../../Custom Hooks/UseFormData";
import InputBox from "../../Components/InputBox";

const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = ["name", "percentage"];
const headings = ["Product Name", "Tax %"];
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
};
export default function Sales() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");
  const [formData, handleChange] = UseFormData(initialData);

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
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <InputBox
              label={"Party Name"}
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
              colspan="3"
            />
            <InputBox
              label={"Party GST"}
              name="gst"
              value={formData.gst}
              onChange={handleChange}
              colspan="3"
            />
            <InputBox
              label={"Date"}
              name="date"
              value={formData.date}
              type="date"
              onChange={handleChange}
              colspan="3"
            />
            <InputBox
              label={"Invoice No."}
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleChange}
              colspan="3"
            />
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
            <InputBox
              label={"Quantity"}
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleChange}
            />
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
          Create Bill
        </button>
      </div>
    </div>
  );
}
