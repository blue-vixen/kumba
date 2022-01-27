import { storageService } from "./async-storage.service";
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_ORDER_ADDED } from './socket.service'
import { utilService } from "./utils.service";

const KEY = 'ordersDB'

const gOrders = []

const gDemoOrders = [{
    // deleted :
    // "_id": ObjectId("61b08a52dcbbeca56bd8c366")
    // "createdAt": NumberLong(1638812943485),
    "_id": "61b08a52dcbbeca56bd8c366",
    "dates": {
        "start": "2022-01-06",
        "end": "2022-01-07"
    },
    "guests": {
        "children": null,
        "adults": 1
    },
    "createdAt": 1638812943485,
    "buyer": {
        "_id": "61b064aedcbbeca56bcf1738",
        "fullname": "yami kobin"
    },
    "stay": {
        "_id": "61af1eed3d91ca3df5b407e7",
        "name": "Dream House",
        "price": 160
    },
    "hostId": "61b064d3dcbbeca56bcf1df1",
    "status": "pending"
},
{
    "_id": "61b08a52dcbbeca56bd8c367",
    "dates": {
        "start": "2022-01-08",
        "end": "2022-01-09"
    },
    "guests": {
        "children": null,
        "adults": 1
    },
    "createdAt": 1638812943485,
    "buyer": {
        "_id": "61b064aedcbbeca56bcf1738",
        "fullname": "Ali Adadof"
    },
    "stay": {
        "_id": "61af1eed3d91ca3df5b407e5",
        "name": "Fly's House",
        "price": 100
    },
    "hostId": "61b064d3dcbbeca56bcf1df1",
    "status": "pending"
},
{
    "_id": "61b08a52dcbbeca56bd8c368",
    "dates": {
        "start": "2021-10-10",
        "end": "2021-12-12"
    },
    "guests": {
        "children": null,
        "adults": 1
    },
    "createdAt": 1638812943485,
    "buyer": {
        "_id": "61b064aedcbbeca56bcf1738",
        "fullname": "Adi ababa"
    },
    "stay": {
        "_id": "61af1eed3d91ca3df5b407e6",
        "name": "Modern House",
        "price": 160
    },
    "hostId": "61b064d3dcbbeca56bcf1df1",
    "status": "pending"
},
]
// modern fly dream
export const orderService = {
    add,
    query,
    getById,
    demoQuery,
    remove,
    save
}


async function query(filterBy) {
    var queryStr = (!filterBy) ? '' : `?id=${filterBy._id}`
    return httpService.get(`order${queryStr}`)
    // return httpService.get('order')
}

function demoQuery() {

    return gDemoOrders
    // return httpService.get('order')
}

async function add(order) {
    const addedOrder = await httpService.post(`order`, order)
    return addedOrder
}

function getById(orderId) {
    return httpService.get(`order/${orderId}`)
}

async function save(order) {
    const savedOrder = await httpService.put(`order/${order._id}`, order)
    console.log(savedOrder)
    return savedOrder
}


function remove(id) {
    // return axios.delete(TOYS_URL + id).then((res) => res.data)
    return storageService.remove(KEY, id)
    // const idx = gToys.findIndex((toy) => toy._id === id);
    // gToys.splice(idx, 1);
    // storageService.store(KEY, gToys);
}