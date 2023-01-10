import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toyService } from '../services/toy-back.service.js'

export function ToysFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        value = (type === 'checkbox' && field === 'desc') ? (target.checked ? -1 : 1) : value
        value = (type === 'checkbox' && field === 'inStock') ? (target.checked ? true : false) : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }


    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="toys-filter">
        <h4>Filter our Toys</h4>
        <form className='filter-form' onSubmit={onSubmitFilter}>
            <select className='stock' id="instock-filter" name="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                <option value=''>Availability</option>
                <option value={'yes'}>In stock</option>
                <option value={'no'}>Sold out</option>
            </select>
            <label htmlFor="name">Title:</label>
            <input type="text"
                id="name"
                name="name"
                placeholder="By name"
                value={filterByToEdit.name}
                onChange={handleChange}
            />
            <select multiple={true}
                id="label-filter" name="labels" value={filterByToEdit.labels} onChange={handleChange}>
                <option value="On wheels">On wheels</option>
                <option value={'Box game'}>Box game</option>
                <option value={'Art'}>Art</option>
                <option value={"Baby"}>Baby</option>
                <option value={'Doll'}>Doll</option>
                <option value={'Puzzle'}>Puzzle</option>
                <option value={'Outdoor'}>Outdoor</option>
                <option value={'Battery Powered'}>Battery Powered</option>
            </select>
            <h4>Sort our Toys</h4>

            <select name='sortBy' value={filterByToEdit.sortBy} onChange={handleChange}>
                <option value="">Select Sorting</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">CreatedAt</option>
            </select>
            <label htmlFor="desc">Descending:
                <input name="desc" id="desc" type="checkbox" value={filterByToEdit.desc} onChange={handleChange} />
            </label>
        </form>
    </section>
}