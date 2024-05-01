import { spawn } from 'child_process';

// Define a function to make predictions using the Python script
function predict(inputData) {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['../../model/model.py']);
        let result = '';

        // Handle standard output from the Python script
        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        // Handle errors from the Python script
        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error from Python script: ${data}`);
            reject(data.toString());
        });

        // Handle completion of the Python script
        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python script exited with code ${code}`);
                reject(`Python script exited with code ${code}`);
            } else {
                resolve(result.trim());
            }
        });

        // Pass input data to the Python script
        pythonProcess.stdin.write(JSON.stringify(inputData));
        pythonProcess.stdin.end();
    });
}
