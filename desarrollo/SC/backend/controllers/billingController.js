const async = require('async');
const User = require('mongoose').model('User');
const Business = require('mongoose').model('Business');
const Invoice = require('mongoose').model('Invoice'); // crear endpoints para Envoice
const FinancialTransaction = require('mongoose').model('FinancialTransaction'); // create endpoint
const Subscription = require('mongoose').model('Subscription'); // create endpoint
const { keys } = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const { generate } = require('../services/token');
exports.pay_and_register = async (req, res) => {
  const id = req.decoded._id;
  const { stripe_token, user, business, product } = req.body;
  const charge = await stripe.charges.create({
    amount: product.amount * 100,
    currency: 'usd',
    description: 'asd',
    source: stripe_token.id
  });
  const payment_detail = {
    payment_id: charge.source.id,
    last4: charge.source.last4,
    brand: charge.source.brand,
    name: charge.source.name,
    amount: charge.amount
  }
  
  // actualizamos usuario
  async.waterfall([
    (cb) => {
      User.findByIdAndUpdate(
        id,
        {
          $set: {
            ...user,
            type: `${req.decoded.type === 'admin' ? 'admin' : 'businessman'}`
          }
        },
        { new: true },
        (err, user) => {
          if (err) return cb({ status: 500, data: { success: false, message: err.message } });
          if (!user) return cb({ stuts: 404, data: { success: false, message: 'User has not found' } });

          const response = {
            user: generate(user)
          }
          cb(null, response);
        });
    }, (response, cb) => {
      Business.create({ user_id: req.decoded._id, ...business }, (err, createdBusiness) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        response.business = createdBusiness;
        cb(null, response);
      })
    }, (response, cb) => {
      Invoice.create({
        amount: product.amount,
        product_id: product.id,
        user_id: id
      }, (err, invoice) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        response.invoice = invoice;
        cb(null, response);
      });
    }, (response, cb) => {
      FinancialTransaction.create({
        invoice_id: response.invoice._id,
        payment_detail
      }, (err, financialTransaction) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        response.financialTransaction = financialTransaction;
        cb(null, response);
      });
    }, (response, cb) => {
      const start_time = new Date();
      start_time.setDate(start_time.getDate() + 1);
      start_time.setHours(0);
      start_time.setMinutes(0);
      start_time.setSeconds(0);

      const end_time = new Date(start_time);
      end_time.setDate(end_time.getDate() + 30);

      Subscription.create({
        product_id: product.id,
        user_id: id,
        start_time,
        end_time
      }, (err, subscription) => {
        if (err) return cb({ status: 500, data: { success: false, message: err.message } });
        response.subscription = subscription;
        cb(null, response);
      })
    }
  ], (err, result) => {
    if (err) return res.status(err.status).send(err.data);
    res.status(200).send(result);
  });
  // creamos business

  // create invoice 

  //create finance Transaction

  // create subscription
  // res.send('pagaste y te registraste pe');
}
