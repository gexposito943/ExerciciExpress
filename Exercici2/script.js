import express from "express";
import routes from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//analitzem dades del form i les guardem a req.body metode post
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware que registra les peticions
app.use("/mountain", (req, res, next) => {
  console.log("Nova petició rebuda");
  next();
});
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });

app.use("/mountain", routes);



app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
