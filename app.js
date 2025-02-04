const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('./config/passport');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/', userRoute);
app.use('/', postRoute);
app.use('/', commentRoute);
app.use(passport.initialize());
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
