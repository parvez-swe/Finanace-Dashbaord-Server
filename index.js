import express from "express";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from './routes/product.js'
import transactionRoutes from './routes/transaction.js';
import { kpis, transactions } from "./data/data.js";
import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from './models/Transaction.js'
import { products } from "./data/data.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
  methods:["GET","POST", "PUT", "DELETE"],
  origin:[process.env.FRONTEND_URI_1,process.env.FRONTEND_URI_2],
}));

//ROUTE SETUP
app.use("/kpi", kpiRoutes);
app.use('/product',productRoutes);
app.use('/transaction',transactionRoutes)

//MONGOOSE SETUP
const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // .then(console.log("Mongo DB connected"))
  .then(async () => {
    app.listen(PORT, () => console.log(`Listening Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
