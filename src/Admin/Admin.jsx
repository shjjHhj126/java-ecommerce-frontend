import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate, Routes, Route } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory from "@mui/icons-material/Inventory";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import GradingIcon from "@mui/icons-material/Grading";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Dashboard from "./pages/Dashboard";
import ProductsTable from "./pages/ProductsTable";
import CreateProductForm from "./pages/CreateProductForm";
import CustomersTable from "./pages/CustomersTable";
import OrdersTable from "./pages/OrdersTable";

const menu = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/admin" },
  { name: "Products", icon: <Inventory />, path: "/admin/products" },
  { name: "Customers", icon: <EmojiPeopleIcon />, path: "/admin/customers" },
  { name: "Orders", icon: <GradingIcon />, path: "/admin/orders" },
  {
    name: "AddProducts",
    icon: <AddShoppingCartIcon />,
    path: "/admin/product/create",
  },
];

const Admin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}>
      {/* {isLargeScreen && <Toolbar />} */}
      {/*if is lg screen, add some space by Toolbar */}

      <List>
        {menu.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            onClick={() => navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {isLargeScreen && <ListItemText>{item.name}</ListItemText>}
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            {isLargeScreen && <ListItemText>Account</ListItemText>}
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="min-h-screen ">
      <div className="flex h-screen ">
        <CssBaseline />
        {/*normalize styles across different browsers by applying some base styles. It resets some default styles like margins, paddings, and font sizes to ensure consistent rendering across browsers*/}

        <div className="w-[15%] border-r-[1px] h-full fixed top-0">
          {drawer}
        </div>

        <div className="w-[85%] ml-[15%]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsTable />} />
            <Route path="/product/create" element={<CreateProductForm />} />
            <Route path="/customers" element={<CustomersTable />} />
            <Route path="/orders" element={<OrdersTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
