import { storageService } from '../services/async-storage.service.js'
import { utilService } from "../services/utils.service.js"
import { httpService } from './http.service.js'

const STAY_URL = 'http://localhost:3030/api/stay/'

const KEY = 'stayDB'


export const stayService = {
    query,
    getById,
    remove,
    save
}


async function query(filterBy) {
    // try {
    //     const res = await axios.get(STAY_URL)
    //     return res.data
    // } catch (err) {
    //     console.log(err)
    // }
    return httpService.get('stay')
}

function getById(stayId) {
    return httpService.get(`stay/${stayId}`)
}

function remove(stayId) {
    return httpService.delete(`user/${stayId}`)
}


async function save(stay) {
    const savedStay = stay._id ?
        await httpService.put('stay', stay) :
        await httpService.post('stay', stay)
    return savedStay
}
