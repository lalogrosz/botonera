// lib/server.ts

import app from "./app";

const server_port: number = process.env.OPENSHIFT_NODEJS_PORT ? parseInt(process.env.OPENSHIFT_NODEJS_PORT, 10) : 3000;
const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address, () => {
    console.log('Express server listening on port ' + server_port);
})