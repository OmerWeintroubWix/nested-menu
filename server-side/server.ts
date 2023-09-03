import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import menuRouter from "./menuRouter";

// @ts-ignore
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// @ts-ignore
app.use(cors());
app.use(menuRouter);

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
