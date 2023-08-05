const express = require("express")
const db = require("./db/db")
const userRoute = require("./routes/auth")
const taskRoute = require("./routes/task")
const cors = require("cors")
const port = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
db()


app.use("/api/user",userRoute);
app.use("/api/tasks",taskRoute);


app.listen(port,()=>{
    console.log(`Server Is Listening On Port 5000`);
});