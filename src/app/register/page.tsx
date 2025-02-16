"use client";

import {
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";

export default function Register() {
  async function register(values: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string;
    gender: string;
  }) {
    let response = await fetch(
      `https://linked-posts.routemisr.com/users/signup`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log(data);
  }

  let { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: register,
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
      }}
    >
      <Paper elevation={7} sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Register
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
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={values.name}
          />
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
          <TextField
            fullWidth
            id="rePassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            onChange={handleChange}
            value={values.rePassword}
          />
          <TextField
            fullWidth
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            variant="outlined"
            onChange={handleChange}
            value={values.dateOfBirth}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="gender"
            label="Gender"
            type="text"
            variant="outlined"
            onChange={handleChange}
            value={values.gender}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, py: 1.5 }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
