import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
    getToyLabels,
    getEmptyToy
}


function query(filterBy = getDefaultFilter()) {
    return storageService.query(STORAGE_KEY).then((toys) => {
        //FILTER
        if (filterBy.name) {
            const regex = new RegExp(filterBy.name, 'i')
            toys = toys.filter(toy => regex.test(toy.name))
        }
        if (filterBy.inStock) toys = toys.filter(toy => toy.inStock)
        if (filterBy.labels) toys = toys.filter(toy => filterBy.labels.every(i => toy.labels.includes(i)))

        //SORT
        if (filterBy.sortBy === 'name') {
            toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * filterBy.desc)
        }

        if (filterBy.sortBy === 'price' || filterBy.sortBy === 'createdAt') {
            toys.sort((t1, t2) => (t1[filterBy.sortBy] - t2[filterBy.sortBy]) * filterBy.desc)
        }
        return toys
    })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId).then(toy=>{
        toy.msgs='I am a TOY'
        return toy
    })
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function getDefaultFilter() {
    return { name: '', inStock: false, labels: [], sortBy: '', desc: 1 }
}

function getToyLabels() {
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    return labels
}


function getEmptyToy(){
    return {name:'',price:0, labels:[], createdAt: Date.now(), inStock:true}
}
//PVT
function _createDemoToys() {
    const DEMO_TOYS = [
        {
            "_id": "t101",
            "name": "Talking Doll",
            "price": 123,
            "labels": ["Doll", "Battery Powered", "Baby"],
            "createdAt": 1631081801111,
            "inStock": true
        },
        {
            "_id": "t102",
            "name": "Remote Control Car",
            "price": 50,
            "labels": ["On wheels", "Battery Powered"],
            "createdAt": 1631231809011,
            "inStock": true
        },
        {
            "_id": "t104",
            "name": "Lego Set",
            "price": 70,
            "labels": ["Box game"],
            "createdAt": 1631431809011,
            "inStock": false
        },
        {
            "_id": "t105",
            "name": "Playstation Console",
            "price": 300,
            "labels": ["Puzzle", "Box game"],
            "createdAt": 1631231101091,
            "inStock": true
        },
        {
            "_id": "t106",
            "name": "Board Game",
            "price": 25,
            "labels": ["Puzzle", "Box game"],
            "createdAt": 1631011701011,
            "inStock": false
        }
    ]
    utilService.saveToStorage(STORAGE_KEY, JSON.parse(JSON.stringify(DEMO_TOYS)))
}

function _createToys() {
    let toysDB = utilService.loadFromStorage(STORAGE_KEY)
    if (!toysDB || !toysDB.length) {
        _createDemoToys()
    }
}