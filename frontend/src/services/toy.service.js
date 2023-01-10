
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'

const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

_createToys()

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getRandomToy,
  getDefaultFilter
}

function query(filterBy) {
  return storageService.query(STORAGE_KEY).then(toys => {
    if (filterBy) {
      if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        toys = toys.filter(toy => regex.test(toy.name))
      }
      if (filterBy.inStock) toys = toys.filter(toy => toy.inStock)
      
      if (filterBy.labels) {
        toys = toys.filter((toy) => toy.labels.includes(filterBy.labels))
      }
      //SORT
      if (filterBy.sortBy === 'name') {
        toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * filterBy.desc)
      }

      if (filterBy.sortBy === 'price' || filterBy.sortBy === 'createdAt') {
        toys.sort((t1, t2) => (t1[filterBy.sortBy] - t2[filterBy.sortBy]) * filterBy.desc)
      }
      return toys
    }
  })
}
function getById(toyId) {
  return Promise.resolve(storageService.get(STORAGE_KEY, toyId))
    .then(toy => {
      toy.msgs = ['i am a dummy msg']
      return toy
    })
}

function remove(toyId) {
  return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
  if (toy._id) {
    return storageService.put(STORAGE_KEY, toy)
  } else {
    return storageService.post(STORAGE_KEY, toy)
  }
}
function getDefaultFilter() {
  return { name: '', inStock: '', labels: [], sortBy: '', desc: 1 }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: '',
    createdAt: '',
    inStock: ''
  }
}

function _createToys() {
  let toys = storageService.loadFromStorage(STORAGE_KEY)
  if (!toys || !toys.length) {
    toys = []
    toys.push(_getToy('Buzz'))
    toys.push(_getToy('Woody'))
    toys.push(_getToy('Mister Potato'))
    storageService.saveToStorage(STORAGE_KEY, toys)
  }
}


function getRandomToy() {
  return 's'
}

function _getToy(toyName) {
  return {
    name: toyName,
    price: utilService.getRandomIntInclusive(50, 150),
    labels: ["Doll", "Battery Powered", "Baby"],
    createdAt: Date.now(),
    inStock: true,
    _id: utilService.makeId()
  }
}