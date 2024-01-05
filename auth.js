const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.redirect('/auth/login');
    } else {
      user.comparePassword(password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          req.session.user = user;
          res.redirect('/');
        } else {
          res.redirect('/auth/login');
        }
      });
    }
  });
});

module.exports = router;
