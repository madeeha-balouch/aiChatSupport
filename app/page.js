"use client";
import Image from "next/image";
import { useState } from "react";
import { Box } from "@mui/system";

export default function Home() {
  const [messages, setMessages] = useState({
    role: "assistant",
    content: "Hi! I'm you support agent today, how can I assist you today?",
  });

  const [message, setMessage] = useState("");

  return <Box width="100vw" height={"100vh"} display={"flex"}></Box>;
}
