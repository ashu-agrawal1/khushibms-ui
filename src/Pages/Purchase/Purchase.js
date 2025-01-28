import React, { useEffect, useState } from "react";
import Table2 from "../../Components/Table2";
import axios from "axios";
import { toast } from "react-toastify";
import SearchableDropdown from "../../Components/SearchableDropdown";

const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = [
  "name",
  "brandName",
  "weight",
  "mrp",
  "hsn",
  "quantity",
  "action",
];
const headings = [
  "Product Name",
  "Brand Name",
  "Weight",
  "MRP",
  "HSN",
  "Quantity",
  "Action",
];

export default function Purchase() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");
  const [quantity, setQuantity] = useState("1");

  const addProductHandler = () => {
    if (!currProduct) {
      toast.error("Please select Product");
      return;
    }
    if (quantity < 1) {
      toast.error("Please Enter valid quantity");
      return;
    }
    const existingProductIndex = selectedProducts?.findIndex(
      (item) => item._id === currProduct
    );
    if (existingProductIndex !== -1) {
      toast.error(
        "Product is already added. Please update the quantity instead."
      );
      return;
    }
    const newProduct = products?.find((ele) => ele._id === currProduct);
    setSelectedProducts((prev) => [...prev, { ...newProduct, quantity }]);
    setQuantity("1");
    setCurrProduct("");
  };
  const updateProductQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      // toast.error("Please Enter valid quantity");
      return;
    }
    const newProducts = selectedProducts?.map((item) => {
      if (item._id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setSelectedProducts(newProducts);
  };
  const deleteProductHandler = (id) => {
    const newProducts = selectedProducts?.filter((item) => item._id != id);
    setSelectedProducts(newProducts);
  };
  const getStock = () => {
    axios({
      method: "get",
      url: baseurl + "products",
    })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
        );
      });
  };
  const submitHandler = () => {
    if (selectedProducts?.length < 1) {
      toast.error("Please add atlease one product");
      return;
    }
    axios({
      method: "post",
      url: baseurl + "purchase",
      data: {
        products: selectedProducts?.map(({ _id, quantity }) => ({
          productId: _id,
          quantity,
        })),
      },
    })
      .then((res) => {
        toast.success("Purchase Added into Stock");
        setSelectedProducts([]);
        setCurrProduct("");
        setQuantity("1");
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          err?.response?.data?.errors?.[0]?.msg || err?.response?.data || ""
        );
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
              <input
                type="text"
                className="block w-full rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-white"
              >
                Supplier GST No.
              </label>
              <input
                type="text"
                className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="last-name"
                className="block text-lg font-medium text-white"
              >
                Date
              </label>
              <input
                type="date"
                className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <SearchableDropdown
              products={products}
              currProduct={currProduct}
              setCurrProduct={setCurrProduct}
              label={"Product"}
            />
            <div className="col-span-2">
              <label className="block text-lg font-medium text-white">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min={1}
                className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            <div className="col-span-2 flex items-end">
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
      {selectedProducts?.length > 0 && (
        <>
          <div className="mt-2">
            <Table2
              headings={headings}
              data={selectedProducts}
              datakeys={inventoryResponseKeys}
              onChangeQuantity={(e) => {
                updateProductQuantity(e.target.id, e.target.value);
              }}
              onDeleteHandler={(id) => deleteProductHandler(id)}
            />
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="rounded-xl px-12 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
              onClick={submitHandler}
            >
              Create Purchase
            </button>
          </div>
        </>
      )}
    </div>
  );
}
