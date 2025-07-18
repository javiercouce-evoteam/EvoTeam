const express = require('express');
const app = express();
app.get('/', (_, res) => res.send('Hello from backend'));
app.listen(3001, () => console.log('API running on http://localhost:3001'));

