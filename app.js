const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', commentRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
