const express = require('express');
const app = express();

// Fixed: Added authentication check
app.delete('/api/admin/users/:id', (req, res) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).send({ error: 'Forbidden' });
  }

  const userId = req.params.id;

  // Fixed: Using parameterized query
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId]);

  res.send({ deleted: true });
});

// Still has hardcoded credentials (intentional - for testing detection)
const config = {
  apiKey: 'sk-1234567890abcdefghijklmnop',
  dbPassword: 'SuperSecret123!'
};

// Added error handling
app.listen(3000, (err) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log('Server running on port 3000');
});
