import { storageService } from '../services/async-storage.service.js'
import { utilService } from "../services/utils.service.js"
const KEY = 'userDB'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    query,
    getById,
    remove,
    save,
    getLoggedinUser,
    update
}



var gUser = {
    "_id": "u103",
    "fullname": "Yami Kobin",
    "imgUrl": "3",
    "isAdmin": false,
    "username": "user3",
    "password": "secret",
    "email": "YamiK@bt-mir.com",
    "isHost": false,
    "wishList": ['907978798', '907978795']
}

_saveLocalUser(gUser)

const gUsers = [{
        "_id": "u101",
        "fullname": "Arik Biton",
        "imgUrl": "/img/img1.jpg",
        "isAdmin": false,
        "username": "user1",
        "password": "secret",
        "email": "arik@mr-bit.com",
        "isHost": true,
        "wishList": []
    },
    {
        "_id": "u102",
        "fullname": "Bentz Margalit",
        "imgUrl": "/img/img2.jpg",
        "isAdmin": false,
        "username": "user2",
        "password": "secret",
        "email": "bentz@mr-bit.com",
        "isHost": true,
        "wishList": []
    },
    {
        "_id": "u103",
        "fullname": "Yami Kobin",
        "imgUrl": "/img/img3.jpg",
        "isAdmin": false,
        "username": "user3",
        "password": "secret",
        "email": "YamiK@bt-mir.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u104",
        "fullname": "Ali Adadof",
        "imgUrl": "/img/img4.jpg",
        "isAdmin": false,
        "username": "user4",
        "password": "secret",
        "email": "aadof@lili.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u105",
        "fullname": "Mongo Shapira",
        "imgUrl": "/img/img5.jpg",
        "isAdmin": false,
        "username": "user5",
        "password": "secret",
        "email": "Mshapira@aol.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u106",
        "fullname": "Bobby Biton",
        "imgUrl": "/img/img6.jpg",
        "isAdmin": false,
        "username": "user6",
        "password": "secret",
        "email": "BobbyB@mr-bit.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u107",
        "fullname": "Baten ainor",
        "imgUrl": "/img/img7.jpg",
        "isAdmin": false,
        "username": "user7",
        "password": "secret",
        "email": "BobbyB@mr-bit.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u108",
        "fullname": "Symon maymon",
        "imgUrl": "/img/img8.jpg",
        "isAdmin": false,
        "username": "user8",
        "password": "secret",
        "email": "ohMy@mr-bit.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u109",
        "fullname": "Joseph Bar",
        "imgUrl": "/img/img9.jpg",
        "isAdmin": false,
        "username": "user9",
        "password": "secret",
        "email": "BarBar@mr-bit.com",
        "isHost": false,
        "wishList": []
    },
    {
        "_id": "u110",
        "fullname": "Jhon McLOVIN",
        "imgUrl": "/img/img10.jpg",
        "isAdmin": false,
        "username": "user10",
        "password": "secret",
        "email": "MRlovalova@mr-bit.com",
        "isHost": false,
        "wishList": []
    }


]

function query() {
    return storageService.query(KEY)
}

function getById(id) {
    return storageService.get(KEY, id)
}

function remove(id) {
    return storageService.remove(KEY, id)
}

function save(user) {
    const savedUser = user._id ?
        storageService.put(KEY, user) :
        storageService.post(KEY, user)
    return savedUser
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}

function update(user) {
    const idx = gUsers.findIndex(user => user._id === user._id)
    gUsers.splice(idx, 1, user)
    _saveLocalUser(user)
    return user;
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}