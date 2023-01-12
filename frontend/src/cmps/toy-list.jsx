import { ToyPreview } from "./toy-preview";

export function ToyList(props) {
    const { toys, onRemoveToy } = props
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>
                </li>
            ))}
        </ul>
    )
}
