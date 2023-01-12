
import { httpService } from './http.service.js'

const BASE_URL = 'toys/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter
}

function query(filterBy ='') {
    const queryParams = `?name=${filterBy.name}&inStock=${filterBy.inStock}
    &labels=${filterBy.labels}&sortBy=${filterBy.sortBy}&desc=${filterBy.desc}`
    return httpService.get(BASE_URL + queryParams)
}
function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL, toy)
    }
    else {
        return httpService.post(BASE_URL, toy)
    }

}

function getDefaultFilter() {
    return { name: '', inStock: '', labels: [], sortBy: '', desc: 1 }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: '[]',
        createdAt: '',
        inStock: ''
    }
}


function getRandomToy() {
    return 's'
}

