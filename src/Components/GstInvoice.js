import { toDDMMYYYY } from "../Utils.js/Dates";

const GSTInvoice = ({ data, products, total }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="border-2">
        <h1 className="text-2xl font-bold text-center underline">
          GST / TAX INVOICE
        </h1>
        <h1 className="text-2xl font-bold text-center leading-none">
          Muskan Agency
        </h1>
        <p className="text-center leading-none">
          Samdariya Colony,Mukharjee Chowk,Manegaon,Ranjhi Jabalpur(M.P.) 482002
        </p>
        <p className="text-center">
          Phone - 8839316092, WHATSAPP - 8839316092 Email:-
          Lovekeshyadav82@gmail.com
        </p>
        <p className="text-center font-bold">
          FSSAI No : 
        </p>
        <p className="text-center font-bold leading-none mb-2">
          Authorised Distributors of SHAGUN, RAMBANDHU & MOHINI
        </p>
      </div>
      <div className="grid grid-cols-8 border-x-2">
        <div className="col-span-5 border-r-2 px-2">
          <p className="font-bold">Party Details : {data?.partyName}</p>
          <p className="font-bold">Party GST:- {data?.gst}</p>
        </div>
        <div className="col-span-3 px-2">
          <p className="font-bold">Invoice No : {data?.invoiceNo}</p>
          <p className="">Dated : {toDDMMYYYY(data?.date)}</p>
          <p className="">Party Tel.:-</p>
        </div>
      </div>
      <div className="border-2 border-b-0 font-bold">
        <span className="mx-5 mr-36">E-Inv Ack. No.</span>
        <span className="mx-5 mr-24">E-Inv IRN No.</span>
        <span className="mx-5">E-Inv Ack. Date</span>
      </div>
      {/* products table */}
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-2 py-2 w-2">S.N.</th>
              <th className="border border-gray-300 px-1 py-2">Product Name</th>
              <th className="border border-gray-300 px-1 py-2">HSN</th>
              <th className="border border-gray-300 px-1 py-2">MRP</th>
              <th className="border border-gray-300 px-1 py-2">Qty</th>
              <th className="border border-gray-300 px-1 py-2">Rate (₹)</th>
              <th className="border border-gray-300 px-1 py-2">GST%</th>
              <th className="border border-gray-300 px-1 py-2">CGST (₹)</th>
              <th className="border border-gray-300 px-1 py-2">SGST (₹)</th>
              <th className="border border-gray-300 px-1 py-2">Amount</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium">
            {products?.map((product, i) => {
              return (
                <tr key={product._id} className="text-right">
                  <td className="border-x border-gray-300 px-2">{i + 1}.</td>
                  <td className="border-x border-gray-300 px-1 text-left">
                    {product.name}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.hsn}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.mrp.toFixed(2)}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.quantity}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.sellingPrice.toFixed(2)}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.taxPercentage}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.cgst.toFixed(2)}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.sgst.toFixed(2)}
                  </td>
                  <td className="border-x border-gray-300 px-1">
                    {product.amount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="font-bold text-right border-2 py-2">
        Totals c/o <span className="mx-2 ml-4">₹ {total.toFixed(2)}</span>
      </div>
      <div className="border-x-2 border-b-2 p-2">
        <span className="font-bold underline">Terms and Conditions</span>
        <span className="mx-4">E.& O. E.</span>
        <span className="font-bold mx-4">GST - 23AGXPY3962G1ZN</span>
        {/* <span className="font-bold ml-6">For KAMLA MARKETING</span> */}
        <br />
        <span className="mr-2">
          1. Goods once sold would not be taken back.
        </span>
        <span className="">2. Subject to 'JABALPUR' Jurisdiction only.</span>
        <br />
        <span className="">
          3. Payment strictly required within 7 days from the Billing Date.
        </span>
      </div>
    </div>
  );
};

export default GSTInvoice;
