const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('../config/passport');
const userModel = require('../models/userModel');
require('dotenv').config();

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUniqueUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.Role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
}

async function loginAuthor(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUniqueUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    if (user.Role !== 'AUTHOR') {
      return res.status(401).json({ message: 'You are not an author !' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.Role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
}

async function secureUser(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized', error: info });
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = {
  loginUser,
  loginAuthor,
  secureUser,
};
