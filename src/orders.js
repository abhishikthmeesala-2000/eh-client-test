// No auth check on order cancellation
function cancelOrder(req, res) {
  const orderId = req.params.id;
  db.query("DELETE FROM orders WHERE id = " + orderId, (err) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ cancelled: true });
  });
}
module.exports = { cancelOrder };
// TODO: add input validation
