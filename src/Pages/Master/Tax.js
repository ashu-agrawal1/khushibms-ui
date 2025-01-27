import React, { useEffect, useState } from "react";
import Table from "../../Components/Table";
import axios from "axios";
import { objectToArray } from "../../helper/ResponseHandler";
import { toast } from "react-toastify";

const baseurl = process.env.REACT_APP_BASE_URL;
const taxPageResponseKeys = ["name", "percentage"];
const headings = ["Tax Name", "Tax %"];
export default function Tax() {
  const [tabledata, setTabledata] = useState([]);
  const [name, setName] = useState("");
  const [perc, setPerc] = useState("");
  const getTax = () => {
    axios({
      method: "get",
      url: baseurl + "master/tax",
    })
      .then((res) => {
        setTabledata(objectToArray(taxPageResponseKeys, res.data));
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data || "");
      });
  };

  const addTaxHandler = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: baseurl + "master/tax",
      data: { name, perc },
    })
      .then((response) => {
        console.log(response);
        getTax();
        toast.success("Tax Added");
        setName("");
        setPerc("");
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
    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-2">
      <div className="col-span-1">
        <Table headings={headings} data={tabledata} />
      </div>
      <div className="col-span-1">
        <form onSubmit={addTaxHandler}>
          <div className="space-y-12">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="col-span-2">
                <label
                  htmlFor="first-name"
                  className="block text-lg font-medium text-white"
                >
                  Tax name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-md px-3 py-1.5 bg-[#B6D5FFB2] text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="last-name"
                  className="block text-lg font-medium text-white"
                >
                  Tax %
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    value={perc}
                    onChange={(e) => setPerc(e.target.value)}
                    max={"100"}
                    className="block w-full rounded-md bg-[#B6D5FFB2] px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-xl px-12 py-2 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 bg-[#4ADC15B2]"
            >
              Add Tax
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
