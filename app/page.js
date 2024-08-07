"use client";
import Image from "next/image";
import { useState } from "react";
import { Box, Stack } from "@mui/system";
import { Button, TextField } from "@mui/material";

const style = {
  backgroundColor: "lightgray",
  color: "white",
  borderRadius: 16,
  padding: 3,
};

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm you support agent today, how can I assist you today?",
    },
  ]);

  const [message, setMessage] = useState("");

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                //sx={style}
                backgroundColor={
                  message.role === "assistant"
                    ? "blue"
                    : "secondary.main"
                }
                color="white"
                borderRadius={16}
                padding={3}
              >
                {message.content || "No message content"}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained">send</Button>
        </Stack>
      </Stack>
    </Box>
  );
}
