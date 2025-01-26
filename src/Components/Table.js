import React from "react";

export default function Table({ headings, data }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-purple-500">
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
        <tbody>
          {data?.map((row, i) => {
            return (
              <tr
                key={i}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                {row.map((item, j) => {
                  return (
                    <td className="px-6 py-4" key={j}>
                      {item}
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
