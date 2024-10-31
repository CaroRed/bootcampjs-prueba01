import express from "express";
import homeRoute from "./router/home.route";

const __dirname = import.meta.dirname;
console.log(__dirname);

const app = express();

app.use("/", homeRoute);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
