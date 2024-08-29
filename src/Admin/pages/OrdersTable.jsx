import {
  Avatar,
  AvatarGroup,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/Admin/Order/Action";
import styled from "@emotion/styled";

const OrdersTable = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#0A3D62",
      color: "#DAE0E2",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#EAF0F1",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const dispatch = useDispatch();
  const { adminOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log("admin orders", adminOrder);
  return (
    <div className="px-5 py-5">
      <TableContainer sx={{ bgcolor: "#DAE0E2" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Id
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Image
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Title
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Price
              </StyledTableCell>

              <StyledTableCell sx={{ color: "black" }} align="left">
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminOrder?.orders?.map((item) => (
              <StyledTableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  color: "white",
                }}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  sx={{ color: "black" }}>
                  {item.id}
                </StyledTableCell>

                <StyledTableCell sx={{ color: "black" }} align="left">
                  <AvatarGroup sx={{ justifyContent: "left" }}>
                    {item.orderItems.map((orderItem) => (
                      <Avatar
                        key={orderItem.imageUrl}
                        sx={{ border: 0 }}
                        src={orderItem.product.imageUrl}></Avatar>
                    ))}
                  </AvatarGroup>
                </StyledTableCell>

                <StyledTableCell
                  scope="row"
                  sx={{ color: "black" }}
                  align="left">
                  {item.orderItems.map((orderItem) => (
                    <p key={orderItem.imageUrl}>{orderItem.product.title},</p>
                  ))}
                </StyledTableCell>

                <StyledTableCell sx={{ color: "black" }} align="left">
                  $ {item.totalPrice.toLocaleString("en-US")}
                </StyledTableCell>

                <StyledTableCell sx={{ color: "black" }} align="left">
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteProduct(item.id)}
                    sx={{
                      bgcolor: "white",
                      color: "#EC4849",
                      borderColor: "#EC4849",
                      "&:hover": {
                        backgroundColor: "#EC4849",
                        borderColor: "#EC4849",
                        color: "white",
                      },
                    }}>
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
