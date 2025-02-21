import React, { useEffect, useState } from "react";
import Table from "../Components/Table";
import axios from "axios";
import { objectToArray } from "../helper/ResponseHandler";
import { toast } from "react-toastify";
import InputBox from "../Components/InputBox";
import Table3 from "../Components/Table3";
import { useNavigate } from "react-router-dom";

const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = [
  "name",
  "brandName",
  "category",
  "weight",
  "sellingPrice",
  "mrp",
  "stock",
  "purchasePrice",
  "taxPercentage",
  "hsn",
  "supplier",
  "uniqueId",
  "action",
];
const headings = [
  "Product Name",
  "Brand Name",
  "Category",
  "Weight",
  "Rate",
  "MRP",
  "Stock",
  "Purchase Price",
  "Tax%",
  "HSN",
  "Supplier",
  "Unique Id",
  "Action",
];
let allData = [];
export default function Inventory() {
  const [tabledata, setTabledata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const getStock = () => {
    axios({
      method: "get",
      url: baseurl + "products",
    })
      .then((res) => {
        allData = res.data;
        setTabledata(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
        );
      });
  };

  useEffect(() => {
    const filteredData = allData?.filter((item) =>
      (item.name + item.brandName + item.category)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setTabledata(filteredData);
  }, [searchQuery]);

  const deleteProductHandler = (id) => {
    axios({
      method: "delete",
      url: baseurl + "products/" + id,
    })
      .then((res) => {
        toast.success("Product Deleted Successfully");
        getStock();
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
        );
      });
  };
  const editProductHandler = (id) => {
    navigate("/products/editproduct?id=" + id);
  };

  useEffect(() => {
    getStock();
  }, []);

  return (
    <div className="mt-4">
      <div className="margin-auto px-96 mb-4">
        <InputBox
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Search"}
        />
      </div>
      <Table3
        headings={headings}
        data={tabledata}
        datakeys={inventoryResponseKeys}
        onDeleteHandler={deleteProductHandler}
        onEditHandler={editProductHandler}
      />
    </div>
  );
}
