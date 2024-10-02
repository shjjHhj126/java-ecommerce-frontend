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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../redux/Admin/Order/Action";
import styled from "@emotion/styled";
import OrderStateDropdownMenu from "../components/OrderStateDropdownMenu";
import { api } from "../../config/ApiConfig";
import OrderDetailsModal from "../components/OrderDetailsModal";
const accessToken = localStorage.getItem("accessToken");

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
  const { orders, changedOrder } = useSelector((store) => store.adminOrder);
  const [fetchedOrder, setFetchedOrder] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    dispatch(getOrders());
  }, [changedOrder]);

  const handleOpen = (id) => {
    const fetchData = async (id) => {
      const { data } = await api.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setFetchedOrder(data);
    };

    fetchData(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFetchedOrder(null);
  };

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
                Order Detail
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Created At
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Selling Price
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Order State
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Payment Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders &&
              orders.orderList?.map((item) => (
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
                    <Button
                      onClick={() => handleOpen(item.id)}
                      variant="outlined">
                      order Detail
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell sx={{ color: "black" }} align="left">
                    {new Date(item.createdAt.slice(0, 23) + "Z").toLocaleString(
                      "zh-TW",
                      {
                        timeZone: "Asia/Taipei",
                      }
                    )}
                  </StyledTableCell>

                  <StyledTableCell sx={{ color: "black" }} align="left">
                    {item.sellingPrice.toLocaleString("zh-TW", {
                      style: "currency",
                      currency: "TWD",
                    })}
                  </StyledTableCell>

                  <StyledTableCell sx={{ color: "black" }} align="left">
                    {item.orderStateRecordList[0].state == "PENDING" ? (
                      <OrderStateDropdownMenu
                        state={item.orderStateRecordList[0].state}
                        orderId={item.id}
                        paymentStatus={item.payment.status}
                      />
                    ) : (
                      <p>{item.orderStateRecordList[0].state}</p>
                    )}
                  </StyledTableCell>
                  <StyledTableCell sx={{ color: "black" }} align="left">
                    {item.payment.status}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {fetchedOrder && (
        <OrderDetailsModal
          open={open}
          handleClose={handleClose}
          fetchedOrder={fetchedOrder}
          StyledTableCell={StyledTableCell}
          StyledTableRow={StyledTableRow}
        />
      )}
    </div>
  );
};

export default OrdersTable;
