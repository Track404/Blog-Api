const express = require('express');
const app = express();

const userRoute = require('./routes/userRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
