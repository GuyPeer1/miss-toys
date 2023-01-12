import { useEffect, useRef, useState } from "react"
import ReactSelect from "react-select"


import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    const [selectedOptions, setSelectedOptions] = useState();
    const elInputRef = useRef(null)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        value = (type === 'checkbox' && field === 'desc') ? (target.checked ? -1 : 1) : value
        value = (type === 'checkbox' && field === 'inStock') ? (target.checked ? true : false) : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const labelsToSet = data.length ? data.map(i => i.value) : []
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: labelsToSet }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <div>
        <form className="toy-filter" onSubmit={onSubmitFilter}>
            <label>Name: 
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={filterByToEdit.name}
                    onChange={handleChange}
                    ref={elInputRef}
                />
            </label>
            <label>inStock: 
                <input name="inStock" id="inStock" type="checkbox" value={filterByToEdit.inStock} onChange={handleChange} />
            </label>
            <div className="dropdown-container">
                <ReactSelect
                    options={toyService.getToyLabels().map((label) => ({ value: label, label }))}
                    placeholder="Select labels"
                    value={selectedOptions}
                    onChange={handleSelect}
                    isMulti={true}
                />
            </div>

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
    </div>
}
