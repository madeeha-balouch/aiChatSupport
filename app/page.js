"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import './globals.css'

const Home = () => {
  const router = useRouter();
  const [welcomeText, setWelcomeText] = useState("");
  const text = "Welcome to AI Chat Support";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setWelcomeText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [text]);

  const handleGetStarted = () => {
    router.push("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <Container
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          padding: 4,
          borderRadius: 5,
          maxWidth: "md",
          position: "relative",
        }}
      >
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={12} textAlign="center">
            <img
              src="/img/image-bot.jpg"
              alt="Centered Content"
              style={{
                borderRadius: "50%",
                width: "150px",
                height: "150px",
                objectFit: "cover",
                margin: "0 auto",
              }}
            />
          </Grid>
          <Grid item xs={12} md={8} textAlign="center">
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                color: "#007bff",
                fontWeight: "bold",
                fontFamily: "Arial, sans-serif",
                marginBottom: 2,
              }}
            >
              <div className="welcome-text">{welcomeText}</div>
            </Typography>
            <Typography
              variant="h7"
              component="p"
              gutterBottom
              sx={{
                color: "white",
                fontFamily: "inherit",
                marginBottom: 4,
                alignContent:"justify"
              }}
            >
              Empower yourself with knowledge about AI ethics, policies, and
              guidelines through our dedicated chatbot. Our AI is here to help
              you navigate the complexities of ethical AI use, ensuring you
              understand the standards and practices that shape responsible
              technology.
            </Typography>
            <Button
              variant="outlined"
              color="warning"
              size="large"
              onClick={handleGetStarted}
              sx={{ mt: 1, borderColor: 'white', color: 'white' }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
