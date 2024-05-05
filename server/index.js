import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'; 
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// Enable CORS
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 9000;

/* ML model interaction child process */
app.post('/predict', (req, res) => {
    const inputData = req.body;

    // const pythonExecutable = '/opt/render/.local/bin/python'; // Adjust the path as necessary
    // const pythonProcess = spawn(pythonExecutable, ['model.py', JSON.stringify(inputData)]);


    const pythonScriptPath = path.join(__dirname, 'model.py');
    const pythonProcess = spawn('python', ['model.py', JSON.stringify(inputData)]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data.toString()}`);
    });    

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                // Parse the result
                const parsedResult = JSON.parse(result);
                console.log(parsedResult)
                // Send the parsed result as the response
                res.json(parsedResult);
            } catch (error) {
                console.error(`Error parsing result: ${error}`);
                res.status(500).send({ error: 'Internal server error' });
            }
        } else {
            console.error(`Python script exited with code ${code}`);
            res.status(500).send({ error: 'Internal server error' });
        }
    });
});


/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));
