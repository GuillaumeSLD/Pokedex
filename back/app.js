import express from 'express';
import router from './routers/router.js';
import cors from "cors";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors({origin: "*"}));

app.use(router);

app.listen(PORT, () => {
  console.log(`Opokedex REST API is listening on http://localhost:${PORT}`);
})