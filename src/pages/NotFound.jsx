import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

const NotFound = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      textAlign: "center",
    }}
  >
    <Typography variant="h2" color="error" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      Oops! The page you're looking for doesn't exist.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      sx={{ mt: 2 }}
    >
      Back to Home
    </Button>
  </Box>
);

export default NotFound;
