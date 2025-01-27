import React from "react";
import InputBox from "./InputBox";

export default function Table2({ headings, data, datakeys, onChangeQuantity }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-white text-semibold dark:text-gray-400">
        <thead className="text-lg text-white uppercase dark:bg-gray-700 dark:text-gray-400 bg-[#AB7CD2] border-b-2 border-white">
          <tr>
            {headings?.map((heading, i) => {
              return (
                <th scope="col" className="px-6 py-3 ">
                  {heading}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-[#B6D5FFB2]">
          {data?.map((row, i) => {
            return (
              <tr
                key={i}
                className="border-b-2 dark:bg-gray-800 dark:border-gray-700 border-white"
              >
                {datakeys?.map((datakey, j) => {
                  if (datakey == "quantity") {
                    return (
                      <td className="px-6 py-4" key={j}>
                        {/* <input type="number" value={row[datakey]} /> */}
                        <InputBox
                          type="number"
                          value={row[datakey]}
                          onChange={onChangeQuantity}
                          id={row?._id || ""}
                          min={"0"}
                        />
                      </td>
                    );
                  }
                  return (
                    <td className="px-6 py-4" key={j}>
                      {row[datakey]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
