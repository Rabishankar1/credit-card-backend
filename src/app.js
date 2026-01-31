const express = require("express");

const userRoutes = require("./routes/user.routes");
const approverRoutes = require("./routes/approver.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/approver", approverRoutes);

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;
