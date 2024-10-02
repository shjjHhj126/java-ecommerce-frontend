import {
  Modal,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

// Modal styles
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "55vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  overflowY: "auto",
  maxHeight: "80vh",
};

const OrderDetailsModal = ({
  open,
  handleClose,
  fetchedOrder,
  StyledTableCell,
  StyledTableRow,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Title */}
        <Typography variant="h6" component="h2" gutterBottom>
          Order Details
        </Typography>

        {/* Render other order fields as raw text */}
        {Object.keys(fetchedOrder).map((key) => {
          if (
            key !== "orderItemList" &&
            fetchedOrder[key] !== null &&
            fetchedOrder[key] !== ""
          ) {
            return (
              <Typography variant="body1" gutterBottom key={key}>
                <strong>{key.replace(/([A-Z])/g, " $1")}: </strong>
                {String(fetchedOrder[key])}
              </Typography>
            );
          }
          return null;
        })}

        {/* Render orderItemList in a table */}
        {fetchedOrder.orderItemList &&
          fetchedOrder.orderItemList.length > 0 && (
            <>
              <Typography variant="h6" component="h3" gutterBottom>
                Order Items
              </Typography>
              <TableContainer
                component={Paper}
                sx={{ mt: 2, bgcolor: "#DAE0E2" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>Product Name</strong>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>Quantity</strong>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>Price</strong>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>Discount Price</strong>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>SKU</strong>
                      </StyledTableCell>
                      <StyledTableCell sx={{ color: "black" }} align="left">
                        <strong>Property Value</strong>
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fetchedOrder.orderItemList.map((item, index) => (
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
                          {item.productName}
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black" }}>
                          {item.quantity}
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black" }}>
                          {item.price}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black" }}>
                          {item.discountPrice}
                        </StyledTableCell>

                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black" }}>
                          {item.sku}
                        </StyledTableCell>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          sx={{ color: "black" }}>
                          {item.propertyValueString}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}

        {/* Close button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;
