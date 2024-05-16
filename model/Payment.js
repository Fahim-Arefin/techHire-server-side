const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  serviceId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  transactionId:{
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
