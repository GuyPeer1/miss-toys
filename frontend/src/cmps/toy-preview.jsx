import { Link } from 'react-router-dom'

export function ToyPreview({ toy, onRemoveToy }) {
  return (
    <div className="toy-preview">
      <h3 className="txt">{toy.name}</h3>
      <img src={require(`../assets/img/toy.png`)} alt="toy" />
      <p className='txt'>Price: ${toy.price}</p>
      <p className='txt'>Created at: {toy.createdAt}</p>
        <button onClick={() => { onRemoveToy(toy._id) }}>x</button>
      <div className="action-btn">
        <Link to={`/toys/edit/${toy._id}`}>Edit Toy</Link>
        <Link to={`/toys/details/${toy._id}`}>Read more...</Link>
      </div>
    </div>
  )
}