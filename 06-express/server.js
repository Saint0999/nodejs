const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/subdir', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'subdir', 'test.html'));
});

app.get('/*splat', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.get(['/old-page', '/old-page.html'], (req, res) => {
    res.redirect('/new-page');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));