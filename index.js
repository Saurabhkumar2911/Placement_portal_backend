require("dotenv/config");
const { DB_CONNECTION } = require("./utils/DB_CONNECTION");
DB_CONNECTION(); // database connection

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// models
require("./Models/Legends");

app.get("/", (req, res) => {
  res.json({
    message: "GREY GANG BACKEND",
    ip_address: req.connection.remoteAddress,
  });
});

//routes
app.use("/legends", require("./Routes/Legends"));
app.use("/auth", require("./Routes/Auth"));

const PORT = process.env.PORT || 3800;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
