require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/contato", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"Formulário Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Novo contato de ${name}`,
      html: `
        <h3>Novo contato recebido</h3>
        <p><b>Nome:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Telefone:</b> ${phone}</p>
        <p><b>Mensagem:</b> ${message}</p>
      `,
    });

    res.redirect("/");
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro ao enviar mensagem." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
