import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LayoutProvider } from "../components/theme";
import { IoOptionsSharp } from "react-icons/io5";

export const AdminOrder = () => {
  return (
    <LayoutProvider>
      <div className="w-full">
        <div className="w-full bg-dark py-[20px] px-[20px] rounded-[10px]">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-[25px] font-bold">Your Orders</h1>
            <button className="flex items-center py-[7px] px-[10px] rounded-[5px] border border-softestdark space-x-[10px]">
              <IoOptionsSharp className="text-[20px]" />
              <span className="text-[14px]">Filter Orders</span>
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 650,
                background: "#1F1D2B",
                borderBottom: "1px solid gray",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow
                  sx={{
                    borderBottom: "1px solid gray",
                    "& th": {
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "white",
                    },
                  }}
                >
                  <TableCell>Customer</TableCell>
                  <TableCell align="right">Menu</TableCell>
                  <TableCell align="right">Total Payment</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              {/* <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
        </div>
      </div>
    </LayoutProvider>
  );
};
