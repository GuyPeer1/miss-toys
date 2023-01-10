const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy) {
    if (!filterBy) return Promise.resolve(toys)
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = toys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.labels) {
        filteredToys = toys.filter((toy) => toy.labels.includes(filterBy.labels))
    }
    if (filterBy.inStock) {
        if (filterBy.inStock === 'yes    ') {
            filteredToys = toys.filter((toy) => toy.inStock !== 'no')
        } else if (filterBy.inStock === 'no    ') {
            filteredToys = toys.filter((toy) => toy.inStock !== 'yes')
        }
    }
    //SORT
    if (filterBy.sortBy === 'name') {
        filteredToys = toys.sort((t1, t2) => t1.name.localeCompare(t2.name) * filterBy.desc)
    }

    if (filterBy.sortBy === 'price' || filterBy.sortBy === 'createdAt') {
        filteredToys = toys.sort((t1, t2) => (t1[filterBy.sortBy] - t2[filterBy.sortBy]) * filterBy.desc)
    }
    return Promise.resolve(filteredToys)
}

function getById(_id) {
    const toy = toys.find(toy => toy._id === _id)
    if (!toy) return Promise.reject('cannot find toy')
    return Promise.resolve(toy);
}

function remove(_id) {
    const idx = toys.findIndex(toy => toy._id === _id)
    if (idx === -1) return Promise.reject('cannot find toy')
    toys.splice(idx, 1)
    return _writeToysToFile()
}

function save(toy) {
    if (toy._id) {
        const toyToupdate = toys.find(currtoy => currtoy._id === toy._id)
        if (!toyToupdate) return Promise.reject('cannot find toy')
        toyToupdate.name = toy.name
        toyToupdate.price = toy.price
    }
    else {
        toy._id = _makeId()
        toy.createAt = Date.now()
        toys.push(toy)
    }
    return _writeToysToFile().then(() => toy)
}


function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            res()
        })
    })
}

