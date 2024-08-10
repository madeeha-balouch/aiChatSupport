"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [welcomeText, setWelcomeText] = useState("");

  useEffect(() => {
    const text = "Welcome to AI Chatbot";
    let index = 0;
    const timer = setInterval(() => {
      setWelcomeText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(timer);
    }, 100);
  }, []);

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
        backgroundColor: "#f0f0f0",
      }}
    >
      <Container
        sx={{
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: 600,
          position: "relative",
        }}
      >
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
          {welcomeText}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          gutterBottom
          sx={{
            color: "#555",
            fontFamily: "Arial, sans-serif",
            marginBottom: 4,
          }}
        >
          Empower yourself with knowledge about AI ethics, policies, and
          guidelines through our dedicated chatbot. Our AI is here to help you
          navigate the complexities of ethical AI use, ensuring you understand
          the standards and practices that shape responsible technology.
        </Typography>

        <img
          src="/img/image-bot.jpg"
          alt="Centered Content"
          style={{
            display: "block",
            margin: "20px auto",
            borderRadius: "50%",
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGetStarted}
          sx={{ mt: 4 }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
