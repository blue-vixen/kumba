const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const socketService = require('../../services/socket.service')
const orderService = require('./order.service')

async function getOrders(req, res) {
    try {
        const orders = await orderService.query(req.query)
        res.send(orders)
    } catch (err) {
        logger.error('Cannot get orders', err)
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function getOrder(req, res) {
    try {
        const order = await orderService.getById(req.params.id)
        res.send(order)
    } catch (err) {
        logger.error('Failed to get order', err)
        res.status(500).send({ err: 'Failed to get order' })
    }
}

async function addOrder(req, res) {
    try {
        var order = req.body
        order.byUserId = req.session.user._id
        order = await orderService.add(order)
        // prepare the updated review for sending out
        // order.toUserId = await userService.getById(order.host._id)

        console.log('CTRL SessionId:', req.sessionID);
        // socketService.broadcast({ type: 'order-added', data: order, userId: order.byUserId })
        socketService.emitToUser({ type: 'order-about-you', data: order, userId: order.host._id })

        res.send(order)

    } catch (err) {
        console.log(err)
        logger.error('Failed to add order', err)
        res.status(500).send({ err: 'Failed to add order' })
    }
}

async function updateOrder(req, res) {
    try {
        var order = req.body
        const userId = order.buyer._id
        order = await orderService.updateOrder(order)
        socketService.emitToUser({ type: 'order-updated', data: order, userId: userId })
        res.send(order)

    } catch (err) {
        console.log(err)
        logger.error('Failed to updated order', err),
            res.status(500).send({ err: 'Failed to update order' })

    }
}

module.exports = {
    getOrders,
    addOrder,
    getOrder,
    updateOrder
}