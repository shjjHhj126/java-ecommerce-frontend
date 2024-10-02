import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch } from "react-redux";
import { changeOrderState } from "../../redux/Admin/Order/Action";

const options = ["PENDING", "CONFIRMED", "SHIPPING", "DELIVERED", "CANCELED"];

export default function OrderStateDropdownMenu({
  state,
  paymentStatus,
  orderId,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    dispatch(changeOrderState({ orderId, orderStatus: options[index] }));

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List component="nav" aria-label="Device settings">
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          sx={{
            border: "#0066CC solid 1px",
            borderRadius: "5px",
            padding: "5px",
          }}>
          <ListItemText
            secondary={options[selectedIndex] || state}
            sx={{
              "& .MuiTypography-root": {
                color: "#0066CC", // Set the text color to blue
                textAlign: "center",
              },
            }}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={
              index === 0 ||
              option == "SHIPPING" ||
              option == "DELIVERED" ||
              (option == "CONFIRMED" && paymentStatus == "PENDING")
            }
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
