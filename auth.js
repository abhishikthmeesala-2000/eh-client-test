const crypto = require('crypto');

// MD5 for password hashing - broken
function hashPassword(password) {
  return crypto.createHash('md5').update(password).digest('hex');
}

// No rate limiting, no lockout
function login(req, res) {
  const { username, password } = req.body;
  // SQL injection
  const query = `SELECT * FROM users WHERE username='${username}' AND password='${hashPassword(password)}'`;
  db.query(query, (err, user) => {
    if (user) {
      // JWT secret hardcoded
      const token = require('jsonwebtoken').sign({ id: user.id }, 'hardcoded-secret-key');
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Bad credentials' });
    }
  });
}

// No auth on password reset
function resetPassword(req, res) {
  const { email, newPassword } = req.body;
  const hash = hashPassword(newPassword);
  db.query(`UPDATE users SET password='${hash}' WHERE email='${email}'`);
  res.json({ ok: true });
}

module.exports = { hashPassword, login, resetPassword };
