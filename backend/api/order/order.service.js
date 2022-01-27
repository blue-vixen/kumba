const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')


async function query1(filterBy = {}) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('order')
        var orders = await collection.aggregate([
            {
                $match: criteria
            },
            {
                $lookup:
                {
                    localField: 'byUserId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    localField: 'hostId',
                    from: 'user',
                    foreignField: '_id',
                    as: 'toHost'
                }
            },
            {
                $unwind: '$toHost'
            }
        ]).toArray()
        orders = orders.map(order => {
            order.byUser = { _id: order.byUser._id, fullname: order.byUser.fullname }
            order.fromHost = { _id: order.fromHost._id, fullname: order.fromHost.fullname }
            delete order.buyer._id
            delete order.hostId
            return order
        })
        return orders
    } catch (err) {
        logger.error('cannot find orders', err)
    }
}

async function query() {
    try {
        const criteria = {}
        const collection = await dbService.getCollection('order')
        var order = await collection.find(criteria).toArray()
        return order
    } catch (err) {
        logger.error('cannot find orders', err)
        throw err
    }
}

async function updateOrder(order) {
    try {
        const orderToSave = order
        orderToSave._id = ObjectId(order._id)
        const collection = await dbService.getCollection('order')
        await collection.updateOne({ _id: orderToSave._id }, { $set: orderToSave })
        return orderToSave

    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function add(order) {
    try {
        // pick only updatable fields!
        const orderToAdd = {
            buyer: order.buyer,
            host: order.host,
            dates: order.dates,
            guests: order.guests,
            stay: order.stay,
            status: order.status
        }
        const collection = await dbService.getCollection('order')
        await collection.insertOne(orderToAdd)
        return orderToAdd;
    } catch (err) {
        logger.error('cannot insert order', err)
        throw err
    }
}

async function getById(orderId) {
    try {
        const collection = await dbService.getCollection('order')
        const order = await collection.findOne({ '_id': ObjectId(orderId) })
        console.log('order service line 76', order)
        return order
    } catch (err) {
        logger.error(`while finding user ${orderId}`, err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}

module.exports = {
    query,
    add,
    getById,
    updateOrder
}