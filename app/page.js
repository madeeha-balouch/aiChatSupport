"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useRouter } from "next/navigation";
import './globals.css'

const Home = () => {
  const router = useRouter();
  const [welcomeText, setWelcomeText] = useState("");
  const text = "Weclome to AI Chat Support"

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setWelcomeText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, 100); // Adjust the interval time if needed

    // Cleanup function to clear the interval if the component unmounts
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
          textAlign: "center",
          backgroundColor: "rgba(255, 255, 200, 0.9)",
          padding: 4,
          borderRadius: 5,
          boxShadow: 3,
          maxWidth: 50,
          position: "relative",
        }}
      >
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
          <div className="welcome-text">
      {welcomeText}
    </div>
        </Typography>

        <Typography
          variant="h7"
          component="p"
          gutterBottom
          sx={{
            color: "black",
            fontFamily: "inherit",
            marginBottom: 4,
          }}
        >
          Empower yourself with knowledge about AI ethics, policies, and
          guidelines through our dedicated chatbot. Our AI is here to help you
          navigate the complexities of ethical AI use, ensuring you understand
          the standards and practices that shape responsible technology.
        </Typography>


        <Button
          variant="outlined"
          color="success"
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
