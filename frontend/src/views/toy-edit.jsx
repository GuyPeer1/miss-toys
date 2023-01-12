import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'

import { toyService } from "../services/toy-back.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy} from '../store/toy.action.js'

export function ToysEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId: toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toys')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('toy saved!')
                navigate('/toys')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }
    

    return <section className="toy-edit">
        <h2>{toyToEdit._id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name || ''}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price || 0}
                onChange={handleChange}
            />

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toys">Cancel</Link>
            </div>
        </form>
    </section>
}