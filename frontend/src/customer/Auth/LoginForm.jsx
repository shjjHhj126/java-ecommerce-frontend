import { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../redux/Auth/Action";

const LoginForm = ({ handleClose }) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = e.target;

    const userData = {
      email: data.email.value,
      password: data.password.value,
    };

    dispatch(login(userData));
    handleClose();
  };

  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt)); //refetch jwt in Action.js
    }
  }, [jwt, auth.jwt]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Log in
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex gap-3 pt-5 items-center">
        <p>Do not have an account? </p>
        <Link to="/signup" className="uppercase text-blue-500">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
