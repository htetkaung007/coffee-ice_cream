// app/page.tsx
"use client";

import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "0 1rem",
        background: "linear-gradient(135deg, #f8fafc, #e2e8f0)",
        textAlign: "center",
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: "3rem", marginBottom: "1rem" }}
      >
        Welcome to Your Restaurant Management App
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ fontSize: "1.25rem", maxWidth: "600px", marginBottom: "2rem" }}
      >
        Simplify your restaurant operations with our intuitive and powerful
        tools.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{ display: "flex", gap: "1rem" }}
      >
        <Link href="/register">
          <Button variant="contained" color="primary" size="large">
            Register
          </Button>
        </Link>
        <Link href="/auth/signIn">
          <Button variant="outlined" color="primary" size="large">
            Login
          </Button>
        </Link>
      </motion.div>
    </main>
  );
}
