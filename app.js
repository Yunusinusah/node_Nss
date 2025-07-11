<<<<<<< HEAD
const express = require("express");
const cors = require("cors")
const authRouter= require("./router/authRouter")

const app = express();

app.use(cors())
app.use(express.json());

app.use("/", authRouter);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
=======
const express = require("express");
const cors = require("cors")
const authRouter= require("./router/authRouter")

const app = express();

app.use(cors())
app.use(express.json());

app.use("/", authRouter);


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`server started at port ${port}`);
>>>>>>> d1bed49361bab5f8a595a105ba58fb935597df3f
})