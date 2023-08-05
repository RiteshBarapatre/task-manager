const express = require("express")
const db = require("./db/db")
const userRoute = require("./routes/auth")
const taskRoute = require("./routes/task")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
db()


app.use("/api/user",userRoute);
app.use("/api/tasks",taskRoute);


app.listen(5000,()=>{
    console.log(`Server Is Listening On Port 5000`);
});