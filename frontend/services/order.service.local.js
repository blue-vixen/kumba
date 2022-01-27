import { storageService } from "./async-storage.service";
import { utilService } from "./utils.service";

const KEY = 'ordersDB'

const gOrders = []

export const orderService = {
    save,
    query,
    getById
}


async function query() {
    return storageService.query(KEY)
}

function save(order) {
    const savedOrder = order._id ?
        storageService.put(KEY, order) :
        storageService.post(KEY, order)
    console.log('saving order', order)
    return savedOrder
}

function getById(id) {
    return storageService.get(KEY, id)
}