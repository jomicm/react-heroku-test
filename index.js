const express = require('express');
const cowsay = require('cowsay');
const cors = require('cors');

// Server
const app = express();

// Serve root
app.get('/', cors(), (req, res) => {
  res.send('Ready!');
})

// Serve custom cow talking
app.get('/api/cow/:say', cors(), async(req, res, next) => {
  try {
    const text = req.params.say;
    const moo = cowsay.say({ text });
    res.json({ moo });
  } catch (err) {
    next(err);
  }
});

// Serve just 'hello world'
app.get('/api/cow', cors(), async(req, res, next) => {
  try {
    const moo = cowsay.say({ text: 'Hello World!' });
    res.send(moo);
  } catch (err) {
    next(err);
  }
});

// Initialize server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log(`Server up in port: ${PORT}`)});
