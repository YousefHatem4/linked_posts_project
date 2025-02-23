import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Variants() {
  return (
    <Stack
      spacing={1}
      sx={{
        m: 3,
        p: 2,
        width: { xs: "90%", md: "75%", xl: "35%" },
        mx: "auto",
      }}
    >
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular" height={100} />
      <Skeleton variant="rounded"  height={100} />
    </Stack>
  );
}
