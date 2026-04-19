import express from "express";
import { auth } from "./auth.js";

const app = express();

app.use("/auth", auth.handler); 

app.listen(3000, () => {
  console.log("Server running on port 3000");
});