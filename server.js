const express = require('express');
const { WebSocketServer } = require('ws');
const { spawn } = require('child_process');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(cors());
const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('WebSocket client connected');

    ws.on('message', (msg) => {
        let data;
        try {
            data = JSON.parse(msg.toString());
        } catch {
            return ws.send(JSON.stringify({ error: 'Invalid message format' }));
        }

        if (data.language && data.code) {
            const { language, code } = data;
            let process;
            let filename;

            if (language === 'python') {
                filename = 'script.py';
                require('fs').writeFileSync(filename, code);
                process = spawn('python', [filename]); // or 'python3' on Linux
            } else if (language === 'javascript') {
                filename = 'script.js';
                require('fs').writeFileSync(filename, code);
                process = spawn('node', [filename]);
            } else {
                return ws.send(JSON.stringify({ error: 'Unsupported language' }));
            }

            process.stdout.on('data', (data) => {
                ws.send(JSON.stringify({ output: data.toString() }));
            });

            process.stderr.on('data', (data) => {
                ws.send(JSON.stringify({ error: data.toString() }));
            });

            process.on('close', () => {
                ws.send(JSON.stringify({ done: true }));
            });

            // Store reference for sending input later
            ws.codeProcess = process;

        } else if (data.input !== undefined && ws.codeProcess) {
            ws.codeProcess.stdin.write(data.input + '\n');
        }
    });

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
    });
});

server.listen(5000, () => console.log('Server running on port 5000'));
