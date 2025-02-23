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
import { FormEvent } from "react";
import toast from "react-hot-toast";

export default function createPost() {

  let router = useRouter(); //! you must choose userouter of navigation not of router | its like Link or useNavigate
  // form event is in react by default
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    let formData = new FormData();
    formData.append("body", form.body.value);
    formData.append("image", form.image.files[0]);

    let response = await fetch(`https://linked-posts.routemisr.com/posts`, {
      method: "POST",
      body: formData,
      headers: {
        'token': `${localStorage.getItem("token")}`,
      },
    });
      let data = await response.json();
      console.log(data);
      toast.success(data.message);
      router.push('/profile');
      
    //   console.log(form.body.value); // the body value
    //   console.log(form.image.files[0]); // the image value
  }

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
          Add Your Post
        </Typography>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            name="body"
            id="body"
            label="body"
            type="text"
            variant="standard"
          />
          <TextField
            name="image"
            id="image"
            label="image"
            type="file"
            variant="standard"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            ADD
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
