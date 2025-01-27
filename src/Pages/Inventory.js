import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import axios from "axios";
import { objectToArray } from "../helper/ResponseHandler";
import { toast } from "react-toastify";

const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = [
  "name",
  "brandName",
  "category",
  "weight",
  "sellingPrice",
  "mrp",
  "stock",
  "hsn",
  "supplier",
  "uniqueId",
];
const headings = [
  "Product Name",
  "Brand Name",
  "Category",
  "Weight",
  "Rate",
  "MRP",
  "Stock",
  "HSN",
  "Supplier",
  "Unique Id",
];
export default function Inventory() {
  const [tabledata, setTabledata] = useState([]);
  const getStock = () => {
    axios({
      method: "get",
      url: baseurl + "products",
    })
      .then((res) => {
        setTabledata(objectToArray(inventoryResponseKeys, res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.errors?.[0]?.msg || err?.response?.data || "");
      });
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <div className="mt-10">
      <Table headings={headings} data={tabledata} />
    </div>
  );
}
