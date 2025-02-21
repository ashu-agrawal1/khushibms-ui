import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UseFormData from "../../Custom Hooks/UseFormData";
import InputBox from "../../Components/InputBox";
import Table2 from "../../Components/Table2";
import SearchableDropdown from "../../Components/SearchableDropdown";
import GSTInvoice from "../../Components/GstInvoice";
import { roundOffTo2Places } from "../../Utils.js/Numbers";
const baseurl = process.env.REACT_APP_BASE_URL;
const inventoryResponseKeys = [
  "name",
  "brandName",
  "weight",
  "mrp",
  "sellingPrice",
  "hsn",
  "quantity",
  "amount",
  "action",
];
const headings = [
  "Product Name",
  "Brand Name",
  "Weight",
  "MRP",
  "rate",
  "HSN",
  "Quantity",
  "Amount",
  "Action",
];
const initialData = {
  partyName: "",
  gst: "",
  address: "",
  date: "",
  invoiceNo: "",
};
let selectedProductsCopy = [];
let formDataCopy = [];
export default function Sales() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currProduct, setCurrProduct] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [total, setTotal] = useState(0);
  const [formData, handleChange, resetForm] = UseFormData(initialData);

  const calculateTotal = (products) => {
    // returning products with total
    let total = 0;
    const productsWithTotal = products?.map((product) => {
      const sgst = roundOffTo2Places(
        (product?.sellingPrice * product.taxPercentage * product.quantity) / 200
      );
      const amount = roundOffTo2Places(
        product.sellingPrice * product.quantity + sgst * 2
      );
      total = total + amount;
      return {
        ...product,
        cgst: sgst,
        sgst,
        amount,
      };
    });
    setTotal(total);
    return productsWithTotal;
  };
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
    setSelectedProducts((prev) =>
      calculateTotal([...prev, { ...newProduct, quantity }])
    );
    setQuantity("1");
    setCurrProduct("");
  };
  const updateProductQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      // toast.error("Please Enter valid quantity");
      return;
    }
    setSelectedProducts((prev) => {
      const newProducts = prev?.map((item) => {
        if (item._id === id) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return calculateTotal([...newProducts]);
    });
  };
  const deleteProductHandler = (id) => {
    setSelectedProducts((prev) => {
      const newProducts = prev?.filter((item) => item._id != id);
      return calculateTotal([...newProducts]);
    });
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
      url: baseurl + "sales",
      data: {
        products: selectedProducts?.map(({ _id, quantity }) => ({
          productId: _id,
          quantity,
        })),
      },
    })
      .then((res) => {
        toast.success("Sales Added into Stock");
        selectedProductsCopy = [...selectedProducts];
        formDataCopy = { ...formData };
        setTimeout(() => {
          window.print();
        }, 10); // Delay to ensure bill is rendered
        setSelectedProducts([]);
        setCurrProduct("");
        setQuantity("1");
        resetForm();
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
          <div className="grid grid-cols-12 gap-x-6 gap-y-8">
            <InputBox
              label={"Party Name"}
              name="partyName"
              value={formData.partyName}
              onChange={handleChange}
            />
            <InputBox
              label={"Party GST No."}
              name="gst"
              value={formData.gst}
              onChange={handleChange}
            />
            <InputBox
              label={"Party Address"}
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputBox
              label={"Date"}
              name="date"
              value={formData.date}
              type="date"
              onChange={handleChange}
            />
            <InputBox
              label={"Invoice No."}
              name="invoiceNo"
              value={formData.invoiceNo}
              onChange={handleChange}
            />
            <div className="col-span-2"></div>
            {/* <div className="col-span-2"></div> */}
            <SearchableDropdown
              products={products}
              currProduct={currProduct}
              setCurrProduct={setCurrProduct}
              label={"Product"}
            />
            <InputBox
              label={"Quantity"}
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={1}
            />
            <div className="col-span-4 flex items-end">
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
          <div className="flex justify-end">
            <button
              type="button"
              disabled
              className="rounded-sm pr-6 pl-4 py-2 text-xl font-semibold text-white"
              onClick={submitHandler}
            >
              Total : {total.toFixed(2)}
            </button>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="rounded-xl px-12 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
              onClick={submitHandler}
            >
              Create Bill
            </button>
          </div>
        </>
      )}
      <div className="hidden print:block print:visible absolute left-0 top-0">
        <GSTInvoice
          data={formDataCopy}
          products={selectedProductsCopy}
          total={total}
        />
      </div>
    </div>
  );
}
