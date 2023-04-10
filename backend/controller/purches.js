
const Razorpay = require('razorpay');
const Order = require('../model/order');

exports.primeMembership = async (req, res, next) => {
  try {
    let rzp = new Razorpay({
      key_id: process.env.ROZARPAY_ID,
      key_secret: process.env.ROZARPAY_SECRET
    })
    const amount = 2500
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.log(err)
      }
      // console.log(order.id)
      // console.log(order.status)
      // console.log(req.user.id)
      Order.create({
        orderId: order.id,
        status: 'PENDING',
        userId: req.user.id
      })
        .then((ord) => { return res.status(201).json({ ord, key_id: rzp.key_id }) })
        .catch(err => { console.log(err) })
    })
  }
  catch (err) {
    console.log(err)
  }
}

exports.transactionUpdate = async (req, res, next) => {
  try {
    let order = await Order.findOne({ where: { orderId: req.body.order_id } })

    // console.log(req.body.status);
    // console.log(req.body.payment_id)

    order.paymantId = req.body.payment_id;
    order.status = req.body.status;
    await order.save()
    res.status(202).json(`transection ${req.body.status}`)
  }
  catch (err) {
    console.log(err)
  }
}