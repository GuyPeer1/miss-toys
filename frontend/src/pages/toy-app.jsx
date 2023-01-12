import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToyList } from '../cmps/toy-list.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy } from '../store/toy.action.js'

export function ToyApp() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        onLoadToys()
    }, [])

    function onLoadToys(filterBy) {
        loadToys(filterBy)
            .then(() => {
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
                console.log("err", err)
            })
    }

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    function setFilter(filterBy) {
        onLoadToys(filterBy)
    }

    return <section>
        <main>

            <ToyFilter onSetFilter={setFilter} />
            <Link to={`/toy/edit`}>Add Toy</Link>
            {isLoading && <p>Loading...</p>}
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </main>
    </section>


}