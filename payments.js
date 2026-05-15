const stripe = require('stripe')('sk_live_HARDCODED_KEY_ABC123');

// No idempotency key - duplicate charges possible on retry
async function chargeCustomer(customerId, amount) {
  const charge = await stripe.charges.create({
    amount: amount,   // no validation - negative/zero accepted
    currency: 'usd',
    customer: customerId,
  });
  return charge;
}

// No auth check - any caller can refund any charge
async function refundCharge(req, res) {
  const refund = await stripe.refunds.create({
    charge: req.body.chargeId,
  });
  res.json(refund);
}

// Logs sensitive card data
async function processPayment(cardNumber, cvv, amount) {
  console.log(`Processing card: ${cardNumber} CVV: ${cvv} amount: ${amount}`);
  return await chargeCustomer('cus_default', amount);
}

module.exports = { chargeCustomer, refundCharge, processPayment };
