import React from "react";
import { TrendingUp, AccountBox, MoreVert } from "@mui/icons-material";
import Inventory from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "#EC4849",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12k",
    title: "Customers",
    color: "#3498DB",
    icon: <AccountBox sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "925k",
    title: "Products",
    color: "#2ecc72",
    icon: <Inventory sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "98k",
    title: "Revenue",
    color: "#EEC213",
    icon: <AttachMoneyIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 3,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            backgroundColor: `${item.color}`,
          }}>
          {item.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverview = () => {
  return (
    <div>
      <Card sx={{ bgcolor: "#0A3D62", color: "white" }}>
        <CardHeader
          title="Monthly Overview"
          action={
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          }
          subheader={
            <Typography variant="body">
              <Box component="span" sx={{ fontWeight: 300 }}>
                Total 48.5% growth{" "}
              </Box>
              this month
            </Typography>
          }
          titleTypographyProps={{
            sx: {
              mb: "0.2rem",
              lineHeight: "1.9rem !important",
              letterSpacing: ".15px !important",
            },
          }}
        />
        <CardContent
          sx={{
            mt: "-0.9rem",
            pt: (theme) => `${theme.spacing(3)} !important`,
          }}>
          <Grid container spacing={[5, 0]}>
            {renderStats()}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyOverview;
