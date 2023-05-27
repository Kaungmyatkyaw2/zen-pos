import React, { useEffect, useRef, useState } from "react";
import { Company, Order } from "../../types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminOrderBillOrerlineRow } from "./AdminOrderBillOrerlineRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BtnPrimary } from "../form";
import { useReactToPrint } from "react-to-print";
import { useUpdateOrderIsPaidMutation } from "../../store/service/order-endpoints/Order.endpoints";
import { updateActiveOrder } from "../../store/slice/AdminOrder.slice";

interface Prop {
  order: Order;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminOrderBill = ({ order, setOpen, open }: Prop) => {
  const [updateOrderIsPaid, updateIsPaidRes] = useUpdateOrderIsPaidMutation();
  const [taxAmount, setTaxAmount] = useState(0);
  const [chargeAmount, setChargeAmount] = useState(0);
  const company = useSelector((state: RootState) => state.user.company);
  const billRef = useRef<HTMLDivElement>(null!);
  const dispatch = useDispatch();

  useEffect(() => {
    if (company) {
      setTaxAmount((order.amount / 100) * company?.tax_rate);
      setChargeAmount((order.amount / 100) * company?.charge_rate);
    }
  }, [order, company]);

  useEffect(() => {
    if (updateIsPaidRes.isSuccess) {
      dispatch(updateActiveOrder({ ...order, isPaid: !order.isPaid }));
      setOpen(false);
    }
  }, [updateIsPaidRes]);

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    onAfterPrint: () => {
      updateOrderIsPaid({ id: order.id, isPaid: true });
    },
  });

  return (
    <div className="fixed top-0 left-0 w-full h-[100vh] flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-[500px] px-[10px] py-[10px] rounded-md bg-white text-black">
        <div ref={billRef}>
          <div className="flex flex-col items-center">
            <h1 className="pb-[.5px] font-semibold text-[25px]">
              {company?.name || ""}
            </h1>
            <p className="text-[19px]">Billing Invoice</p>
          </div>
          <div className="pt-[20px] pb-[10px] text-[14px] space-y-[4px]">
            <div className="flex items-center space-x-[10px]">
              <h1 className="font-medium w-[110px]">Cusomter Name : </h1>
              <p>{order.customer.name}</p>
            </div>
            <div className="flex items-center space-x-[10px]">
              <h1 className="font-medium w-[110px]">Order Id : </h1>
              <p>#{order.id}</p>
            </div>
            <div className="flex items-center space-x-[10px]">
              <h1 className="font-medium w-[110px]">Tax Rate : </h1>
              <p>{company?.tax_rate}%</p>
            </div>
            <div className="flex items-center space-x-[10px]">
              <h1 className="font-medium w-[110px]">Charge Rate : </h1>
              <p>{company?.charge_rate}%</p>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Menu</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Price</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.order_lines.map((i) => (
                  <AdminOrderBillOrerlineRow key={i.id} orderline={i} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex justify-end pr-[10px]">
            <div className="pt-[20px] space-y-[5px]">
              <div className="flex items-center">
                <h1 className="uppercase text-[16px] font-bold w-[150px]">
                  SUBTOTAL
                </h1>
                <p className="text-[16px]">
                  {order.amount - taxAmount - chargeAmount} {company?.currency}
                </p>
              </div>
              <div className="flex items-center">
                <h1 className="uppercase text-[16px] font-bold w-[150px]">
                  TAX
                </h1>
                <p className="text-[16px]">
                  {taxAmount} {company?.currency}
                </p>
              </div>
              <div className="flex items-center">
                <h1 className="uppercase text-[16px] font-bold w-[150px]">
                  charge Amount
                </h1>
                <p className="text-[16px]">
                  {chargeAmount} {company?.currency}
                </p>
              </div>
              <div className="flex items-center">
                <h1 className="uppercase text-[16px] font-bold w-[150px]">
                  Total
                </h1>
                <p className="text-[16px]">
                  {order.amount} {company?.currency}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-evenly pt-[20px]">
          <BtnPrimary
            onClick={handlePrint}
            className="w-[45%] text-white"
            isLoading={updateIsPaidRes.isLoading}
            disabled={updateIsPaidRes.isLoading || order?.isPaid}
          >
            Print Bill
          </BtnPrimary>
          <BtnPrimary
            className="w-[45%] !bg-white !border-2"
            onClick={() => setOpen(false)}
            disabled={updateIsPaidRes.isLoading}
          >
            Cancel
          </BtnPrimary>
        </div>
      </div>
    </div>
  );
};
