import express from "express";
import { PORT, mongDBURL } from "./config.js";
import mongoose from "mongoose";
import { Cat } from "./models/cat.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: 'https://ture-chi.vercel.app',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        allowedHeaders: ["Content-Type", 'Authorization', 'Cache-Control','Expires', 'Pragma'],
        credentials: true
    })
)

// const allowedOrigins = ['https://ture-chi.vercel.app', 'http://localhost:3000'];

// app.use(
//   cors({
//     origin: function(origin, callback){
//       if(!origin) return callback(null, true); // allow Postman or server-to-server
//       if(allowedOrigins.indexOf(origin) === -1){
//         return callback(new Error('Not allowed by CORS'));
//       }
//       return callback(null, true);
//     },
//     methods: ['GET','POST','DELETE','PUT','PATCH'],
//     allowedHeaders: ["Content-Type", 'Authorization'],
//     credentials: true
//   })
// );

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

app.use(cookieParser())



app.use("/", router);

// welcome endpoint
app.get("/", (req, res) => {
  res.status(200).send("Welcome to open royal api");
});



mongoose.connect(mongDBURL).then(()=>{
    console.log('Database connected successfully');

    app.get('/', (request, response)=>{
    response.status(243).send("hello world");
})
}).catch((error)=>{
    console.log(error);
})


app.listen(PORT, ()=>(console.log(`port is connected on port ${PORT}`)))