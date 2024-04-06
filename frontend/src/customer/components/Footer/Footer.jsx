import React from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Footer = () => {
  return (
    <div>
      <Grid
        container
        className="bg-black text-white  mt-12"
        sx={{ bgcolor: "black", color: "white", py: 5 }}>
        <Grid
          item
          container
          sx={{
            flex: 1,
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography
            className="pb-2"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}>
            CUSTOMER CARE
          </Typography>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Contact US
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            FAQs
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            008-0114-7110
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Payment Options
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Track Your Order
          </Button>
        </Grid>
        <Grid
          item
          container
          sx={{
            flex: 1,
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography
            className="pb-2"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}>
            &nbsp;
          </Typography>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Shipping & Delivery
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Returns & Exchanges
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Size Guide
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Gifting REVOLVE
          </Button>
        </Grid>
        <Grid
          item
          container
          sx={{
            flex: 1,
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography
            className="pb-2"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}>
            &nbsp;
          </Typography>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Style Experts
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Why REVOLVE
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Feedback
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Accessibility
          </Button>
        </Grid>
        <Grid
          item
          container
          sx={{
            flex: 1,
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}>
          <Typography
            className="pb-2"
            sx={{
              fontWeight: "bold",
              fontSize: "14px",
              letterSpacing: "0.05em",
            }}>
            INFORMATION
          </Typography>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            About Us
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Social Impact
          </Button>

          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Careers
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Ambassadors
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Affiliate
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Investors
          </Button>
          <Button className="" sx={{ color: "gray", fontSize: "12px" }}>
            Press
          </Button>
        </Grid>

        <Grid
          item
          className="pt-5"
          xs={12}
          container
          alignItems="center"
          justifyContent="space-around"
          sx={{ borderTop: "1px solid gray" }}>
          <Typography color="gray" sx={{ fontSize: "12px" }}>
            2024 &copy; Eminent, Inc. (a Revolve Group company). All Rights
            Reserved.
          </Typography>
          <div>
            <Button sx={{ fontSize: "10px", color: "white" }}>TERMS</Button>
            <Button sx={{ fontSize: "10px", color: "white" }}> PRIVACY</Button>
            <Button sx={{ fontSize: "10px", color: "white" }}>
              COOKIE PREFERENCES
            </Button>
            <Button sx={{ fontSize: "10px", color: "white" }}>
              {" "}
              CA PRIVACY RIGHTS
            </Button>
            <Button sx={{ fontSize: "10px", color: "white" }}>
              {" "}
              CA TRANSPARENCY ACT
            </Button>
            <Button sx={{ fontSize: "10px", color: "white" }}>
              {" "}
              YOUR PRIVACY CHOICES
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
