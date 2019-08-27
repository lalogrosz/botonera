// lib/server.ts

import app from "./app";

const server_port = process.env.port || 3001;
// const server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, () => {
    console.log('Express server listening on port ' + server_port);
})