"use client";

import {
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../_redux/store";
import { setError, setLoading, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";

export default function Login() {
  let isLoading = useSelector((store: State) => store.authReducer.isLoading);

  let dispatch = useDispatch();

  let router = useRouter(); //! you must choose userouter of navigation not of router | its like Link or useNavigate

  async function login(values: { email: string; password: string }) {
    dispatch(setLoading());
    let response = await fetch(
      `https://linked-posts.routemisr.com/users/signin`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    let data = await response.json();
    if (response.ok) {
      router.push("/"); //! go to home page
      dispatch(setToken(data));
    } else {
      dispatch(setError(data.error));
    }
  }

  let { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <Paper elevation={7} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            value={values.email}
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            value={values.password}
          />
          <Button
            disabled={isLoading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            {isLoading ? <CircularProgress size="30px" /> : "login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
