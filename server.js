const express = require('express');
const path = require('path');
const app = express();

const pub = path.join(__dirname, 'public');

app.use(express.static(pub));

app.get('/*', (req, res) => {
    res.sendFile(path.join(pub, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port', process.env.PORT || 3000);
});