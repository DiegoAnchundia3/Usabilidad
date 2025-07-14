import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./user.routes";
import animalRoutes from "./animal.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/animals", animalRoutes);

app.get("/", (req, res) => {
  res.send("API Sistema Bienestar Animal funcionando");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
