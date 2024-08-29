import {
  Avatar,
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
import { deleteProductById, findProducts } from "../../redux/Product/Action";
import styled from "@emotion/styled";

const ProductsTable = () => {
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

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProductById(productId));
  };

  const dispatch = useDispatch();
  const { product } = useSelector((store) => store);
  // console.log("products:", product);

  useEffect(() => {
    const data = {
      category: "men_suits",
      color: [],
      size: [],
      minPrice: 0,
      maxPrice: 1000000000,
      minDiscount: 0,
      sort: "price_low",
      pageNum: 0, //must -1
      pageSize: 10,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [product.deletedProduct]);

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
                Category
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Price
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Quantity
              </StyledTableCell>
              <StyledTableCell sx={{ color: "black" }} align="left">
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {product?.products?.content?.map((item) => (
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
                  <Avatar variant="square" src={item.imageUrl} />
                </StyledTableCell>
                <StyledTableCell sx={{ color: "black" }} align="left">
                  {item.title}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "black" }} align="left">
                  {item.category.name}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "black" }} align="left">
                  {item.price}
                </StyledTableCell>
                <StyledTableCell sx={{ color: "black" }} align="left">
                  {item.quantity}
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

export default ProductsTable;
