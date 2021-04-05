import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import moment from "moment";

const colums = [
  {
    id: "orderCreatedDate",
    lable: "Order Date",
  },
  {
    id: "documentID",
    lable: "Order ID",
  },
  {
    id: "orderTotal",
    lable: "Amount",
  },
];

const styles = {
  fontSize: "16px",
  cursor: "pointer",
  width: "10%",
};

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return `$ ${columnValue.toFixed(2)}`;
    case "orderCreatedDate":
      return moment(columnValue.nano).format("DD/MM/YYYY");
    default:
      return columnValue;
  }
};

function OrderHistory({ orders }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {colums.map((column, pos) => {
              const { lable } = column;
              return (
                <TableCell key={pos} style={styles}>
                  {lable}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(orders) &&
            orders.length > 0 &&
            orders.map((row, pos) => {
              return (
                <TableRow key={pos}>
                  {colums.map((column, pos) => {
                    const columnName = column.id;
                    const columnValue = row[columnName];
                    const formatedText = formatText(columnName, columnValue);
                    return (
                      <TableCell key={pos} style={styles}>
                        {formatedText}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderHistory;
