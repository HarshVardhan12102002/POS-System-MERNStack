import { Button, Modal } from "antd";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PrintBill = ({ isModalOpen, setIsModalOpen, customer }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal
      title="Print Invoice"
      visible={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={false}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice Details:</p>
                  <p className="text-green-600">{customer?.customerName}</p>
                  <p>Fake Street 123</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Invoice:</p>
                  <p>The Boring Company</p>
                </div>
                <div className="text-md text-slate-500">
                  <div>
                    <p className="font-bold text-slate-700">Invoice Number:</p>
                    <p>000{Math.floor(Math.random() * 100)}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700 mt-2">
                      Issue Date:
                    </p>
                    <p>{customer && customer?.createdAt.substring(0, 10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div>
                    <p className="font-bold text-slate-700">Terms:</p>
                    <p>10 days</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Due Date:</p>
                    <p>2023-04-27</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Title
                    </th>
                    <th
                      colSpan={4}
                      scope="col"
                      className="py-3.5 text-left text-sm font-normal text-slate-700 md:pl-0 sm:hidden"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-center text-sm font-normal text-slate-700 md:pl-0 sm:table-cell hidden"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 text-end text-sm font-normal text-slate-700 md:pl-0"
                    >
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="py-4 sm:table-cell hidden">
                        <img
                          src={item.img}
                          alt=""
                          className="h-12 w-12 object-cover"
                        />
                      </td>
                      <td className="py-4 sm:table-cell hidden">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs sm:hidden inline-block">
                            Unit Price {item.price}INR
                          </span>
                        </div>
                      </td>
                      <td className="py-4 sm:hidden" colSpan={4}>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs sm:hidden inline-block">
                            Unit Price {item.price}INR
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center sm:table-cell hidden">
                        <span>{item.price}INR</span>
                      </td>
                      <td className="py-4 sm:text-center text-right sm:table-cell hidden">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span>{item.price * item.quantity}INR</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Subtotal
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">
                        {customer?.subTotal}
                      </p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.subTotal}INR
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">VAT</span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">VAT</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-red-600">
                        +{customer?.tax}INR
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 sm:table-cell hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <span className="font-normal text-slate-700">
                        Total Amount
                      </span>
                    </th>
                    <th
                      className="text-left pt-4 sm:hidden"
                      colSpan="4"
                      scope="row"
                    >
                      <p className="font-normal text-slate-700">Total Amount</p>
                    </th>
                    <th className="text-right pt-4" scope="row">
                      <span className="font-normal text-slate-700">
                        {customer?.totalAmount}INR
                      </span>
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                  <p className="text-sm font-light text-slate-700">
                    Payment terms are 14 days. According to the Late Payment of
                    Commercial Debts (Interest) Act 0000, freelancers have the
                    right to charge a late payment fee of 00.00 if debts are not
                    paid by this time, and at this point, please note that in
                    addition to this fee, a new invoice will be presented.
                    Failure to pay the revised invoice within 14 days will
                    result in an additional interest of 8.5% in total, with a
                    base of 0.5% Bank of England base rate plus 8% statutory
                    rate. The parties cannot make a contract outside the
                    provisions of the law.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>
          Print
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
