const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

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

app.get(['/old-page', '/old-page.html'], (req, res) => {
    res.redirect('/new-page');
});

// route handlers

app.get('/index.html', (req, res, next) => {
    console.log("redirecting");
    next();
}, (req, res) => {
    res.send("Hello Sucker");
});

// chained routes

const one = (req, res, next) => {
    console.log('one');
    next();
};

const two = (req, res, next) => {
    console.log('two');
    next();
};

const three = (req, res) => {
    console.log('three');
    res.send("Finished");
};

app.get('/chain', [one, two, three]);

// catch all route
app.get('/*splat', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));