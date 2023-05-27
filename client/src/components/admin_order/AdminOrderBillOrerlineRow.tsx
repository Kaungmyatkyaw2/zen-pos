import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { OrderLine } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Prop {
  orderline: OrderLine;
}

export const AdminOrderBillOrerlineRow = ({ orderline }: Prop) => {
  const company = useSelector((state: RootState) => state.user.company);

  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        {orderline.menu_items.name}
      </TableCell>
      <TableCell>
        {orderline.menu_items.price} {company?.currency}
      </TableCell>
      <TableCell>{orderline.quantity}</TableCell>
      <TableCell>
        {orderline.menu_items.price * orderline.quantity} {company?.currency}
      </TableCell>
    </TableRow>
  );
};
