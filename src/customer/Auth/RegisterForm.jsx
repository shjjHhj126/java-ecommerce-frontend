import { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, getUser } from "../../redux/Auth/Action";

const RegisterForm = ({ handleClose }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)); //refetch jwt in Action.js
    }
  }, [jwt, auth.jwt]); //jwt might change in localStorage or in redux

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = e.target;

    const userData = {
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
      password: data.password.value,
    };

    dispatch(signup(userData));
    handleClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ color: "white", bgcolor: "black", padding: ".8 rem 0" }}>
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>

      <div className="flex gap-3 pt-5 items-center">
        <p>Already have an account? </p>
        <Link to="/login" className="uppercase text-blue-500">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
