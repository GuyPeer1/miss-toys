import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>Toy Name : {toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        <h5>Messages: {toy.msgs}</h5>
        <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
        <p>Labels: {toy.labels.join(', ')}</p>
        <p>createdAt: {toy.createdAt}</p>

        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </section>
}