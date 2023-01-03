import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Chat gpt server running");
});
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(201).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
});
const PORT=5000 || process.env.PORT
app.listen(PORT, () => {
  console.log("Server runinnig on Port 3000");
});
