
const Payment = require('../model/Payment');

const createPayment = async (req, res) => {
    try {
      const { serviceId, transactionId } = req.body;
      const payment = new Payment({
        serviceId,
        transactionId
      });
      await payment.save();
      res.status(201).json({ message: 'Payment created successfully', payment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {createPayment}