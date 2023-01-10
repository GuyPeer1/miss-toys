import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from "../services/toy-back.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

export function ToysDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadtoy()
    }, [toyId])

    function loadtoy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toys')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        <p>....will be picture soon....</p>
        <p>{toy.msgs}</p>
        <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
        <p>Labels: {toy.labels.join(', ')}</p>
        <p>createdAt: {toy.createdAt}</p>
        <Link to={`/toys/edit/${toy._id}`}>Edit</Link>
    </section>
}