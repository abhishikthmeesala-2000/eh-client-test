const express = require('express');
const app = express();

// Missing authentication
app.delete('/api/admin/users/:id', (req, res) => {
  const userId = req.params.id;

  // SQL injection vulnerability - no parameterization
  const query = "DELETE FROM users WHERE id = " + userId;
  db.query(query);

  res.send({ deleted: true });
});

// Hardcoded credentials
const config = {
  apiKey: 'sk-1234567890abcdefghijklmnop',
  dbPassword: 'SuperSecret123!'
};

app.listen(3000);
