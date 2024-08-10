"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { borderColor, Box, color, Stack } from "@mui/system";
import { Button, TextField, Rating } from "@mui/material"; // Import Rating
import Markdown from "react-markdown";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";

const style = {
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
    borderColor: "black",
  },
  justifyContent: "center",
};

const style_1 = {
  transition: "all 0.4s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 6px 8px rgba(0,0,0,0.15)",
    borderColor: "black",
  },
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "20%",
  left: "20%",
};

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your support agent today, how can I assist you today?",
      rating: null, // Add rating property
    },
  ]);

  const [message, setMessage] = useState("");

  const sendMessages = async () => {
    setMessage("");
    setMessages((messages) => [
      ...messages,
      { role: "user", content: message, rating: null },
      { role: "assistant", content: "", rating: null },
    ]);
    const response = fetch("api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([...messages, { role: "user", content: message }]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";
      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Int8Array(), { stream: true });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {
              ...lastMessage,
              content: lastMessage.content + text,
            },
          ];
        });
        return reader.read().then(processText);
      });
    });
  };

  const handleRatingChange = (index, newValue) => {
    setMessages((messages) => {
      const updatedMessages = [...messages];
      updatedMessages[index].rating = newValue;
      return updatedMessages;
    });
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray"
    >
      <Stack
        direction="column"
        width="500px"
        height="600px"
        border="3px solid yellow"
        borderRadius={10}
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
              flexDirection="column"
              alignItems={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                backgroundColor={
                  message.role === "assistant" ? "yellow" : "green"
                }
                color={message.role === "assistant" ? "black" : "white"}
                fontWeight={500}
                borderRadius={8}
                padding={3}
              >
                {message.content}
              </Box>
              <Box>
                {message.role === "assistant" && (
                  <Rating
                    name={`rating-${index}`}
                    value={message.rating || 0}
                    onChange={(event, newValue) =>
                      handleRatingChange(index, newValue)
                    }
                    sx={{ mt: 1, ml: 1 }}
                  />
                )}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction="row" spacing={3} padding={1}>
          <TextField
            label="message"
            fullWidth
            color="success"
            variant="outlined"
            padding={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            aria-label="send"
            onClick={sendMessages}
            color="success"
            sx={style}
            size="normal"
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
