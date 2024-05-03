import React from "react";
import styled from "@emotion/styled";
import { Button, Card, CardContent, Typography } from "@mui/material";

const triangleImg = styled.img({
  right: 0,
  bottom: 0,
  height: 170,
  position: "absolute",
  backgroundColor: "green",
});

const MoneyImg = styled.img({
  right: 36,
  bottom: 20,
  height: 100,
  backgroundColor: "blue",
  position: "absolute",
});

const Achievement = () => {
  return (
    <Card sx={{ position: "relative", bgcolor: "#0A3D62" }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{ letterSpacing: ".25px", color: "white" }}>
          Accumulated profit 🎉
        </Typography>
        <Typography variant="h5" sx={{ fontSize: "bold", color: "white" }}>
          $5230.12k
        </Typography>

        <Button
          size="small"
          variant="contained"
          sx={{ marginTop: 5, bgcolor: "#0e98ba", color: "white" }}>
          View Sales
        </Button>
      </CardContent>
    </Card>
  );
};

export default Achievement;
