const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
require("./models/db");
const cors = require("cors");

const PORT_URI = process.env.PORT || 4000;
const app = express();
const userRouter = require("./routes/user");
const questionRoutes = require("./routes/questionRoutes");

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.use(cors({
  origin: "https://academixaid.vercel.app",
  methods: ["POST", "GET"], // Corrected syntax
  credentials: true
}));

app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use("/api/questions", questionRoutes);


app.listen(PORT_URI, () => {
  console.log(`Server listening on port:${PORT_URI}`);
});
