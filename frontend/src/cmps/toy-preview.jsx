import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <div className="toy-preview">
      <h3>{toy.name}</h3>
      <img src={require(`../assets/img/toy.png`)} alt="toy" />
      <p>Price: ${toy.price}</p>
      <p>Created at: {toy.createdAt}</p>
      <div className="action-btn">
        <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
        <Link to={`/toys/edit/${toy._id}`}>Edit Toy</Link>
        <Link to={`/toys/details/${toy._id}`}>Read more...</Link>
      </div>
    </div>
  )
}