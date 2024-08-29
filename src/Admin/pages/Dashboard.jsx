import { Grid } from "@mui/material";
import React from "react";
import Achievement from "../components/Achievement";
import MonthlyOverview from "../components/MonthlyOverview";
import ProductsTable from "./ProductsTable";

const Dashboard = () => {
  return (
    <div className="px-5 py-5">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achievement />
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview />
        </Grid>
        <Grid item xs={12} md={8}>
          <ProductsTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
