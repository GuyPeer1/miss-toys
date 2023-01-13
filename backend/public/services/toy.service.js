
// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'


const STORAGE_KEY = 'toy'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    addToyMsg
}
window.cs = toyService


async function query(filterBy = { txt: '', price: 0 }) {
    return httpService.get(STORAGE_KEY, filterBy)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

async function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}
async function save(toy) {
    var savedtoy
    if (toy._id) {
        savedtoy = await httpService.put(`toy/${toy._id}`, toy)

    } else {
        savedtoy = await httpService.post('toy', toy)
    }
    return savedToy
}

async function addToyMsg(toyId, txt) {
    const savedMsg = await httpService.post(`toy/${toyId}/msg`, {txt})
    return savedMsg
}


function getEmptyToy() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}





