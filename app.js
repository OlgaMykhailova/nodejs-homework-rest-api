const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();



// const nodemailer = require("nodemailer");


// const {META_PASSWORD} = process.env

// const nodemailerConfig = {
//     host: "smtp.meta.ua",
//     port: 465, // 25, 465 2255,
//     secure: true, 
//     auth: {
//         user: "olyakaktusya@meta.ua",
//         pass: META_PASSWORD
//     }
// }

// const email = {
//     to: "olyakaktusya@meta.ua",
//     from: "olyakaktusya@meta.ua",
//     subject: "Новое письмо с сайта",
//     html: "<p>Новое письмо с сайта</p>"
// }

// const transporter = nodemailer.createTransport(nodemailerConfig);

// transporter.sendMail(email);



const usersRouter = require("./routes/api/users");
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
