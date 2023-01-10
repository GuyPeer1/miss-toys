import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { ToysList } from '../cmps/toys-list.jsx'
import { ToysFilter } from '../cmps/toys-filter.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadToys, removeToy, saveToy, setFilter } from '../store/toy.action.js'

export function ToysIndex() {

    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const [isAddingToy, setIsAddingToy] = useState(false)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilter(filterBy)
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
    
    return <section className="toys-index">
        <ToysFilter onSetFilter={onSetFilter} />
        <Link to={`/toys/edit`}>Add Toys</Link>
        {isLoading && <p>Loading...</p>}
        {toys && <ToysList toys={toys} onRemoveToy={onRemoveToy} />}
    </section>


}
