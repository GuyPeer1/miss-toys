import { React, useEffect, useState } from 'react'
import ReactSelect from 'react-select';

import { toyService } from '../services/toy-back.service.js'

export function ToysFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [selectedOptions, setSelectedOptions] = useState()

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

    function handleSelect(value) {
        setSelectedOptions(value)
        const labelsToSet = value.length ? value.map(i => i.value) : []
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: labelsToSet }))
    }


    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const options = [
        { value: 'On wheels', label: 'On wheels' },
        { value: 'Box game', label: 'Box game' },
        { value: 'Art', label: 'Art' },
        { value: 'Baby', label: 'Baby' },
        { value: 'Doll', label: 'Doll' },
        { value: 'Puzzle', label: 'Puzzle' },
        { value: 'Outdoor', label: 'Outdoor' },
        { value: 'Battery Powered', label: 'Battery Powered' },
    ]
    return <section className="toys-filter">
        <span className='filter-head'>Filter & Sort our Toys</span>
        <form className='filter-form' onSubmit={onSubmitFilter}>
            <div className='form-main-line'>
                <select className='stock' id="instock-filter" name="inStock" value={filterByToEdit.inStock} onChange={handleChange}>
                    <option value=''>Availability</option>
                    <option value={'yes'}>In stock</option>
                    <option value={'no'}>Sold out</option>
                </select>
                <ReactSelect
                    isMulti={true}
                    options={options}
                    value={filterByToEdit.labels}
                    onChange={handleSelect}
                /></div>
           <div className='title'> 
            <input type="text"
                id="name"
                name="name"
                placeholder="Search By Name..."
                value={filterByToEdit.name}
                onChange={handleChange}
            /></div>
            <div className='sort'>
                <select name='sortBy' value={filterByToEdit.sortBy} onChange={handleChange}>
                    <option value="">Select Sorting</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">CreatedAt</option>
                </select>
                <label htmlFor='desc' className='desc'>Descending:
                    <input name="desc" id="desc" type="checkbox" value={filterByToEdit.desc} onChange={handleChange} />
                </label></div>
        </form>
    </section>
}