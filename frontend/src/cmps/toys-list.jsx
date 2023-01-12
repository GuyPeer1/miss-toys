import { ToyPreview } from "./toy-preview.jsx"

export function ToysList({ toys, onRemoveToy }) {
    return <section className="toys-container">
        {toys.length > 0 && toys.map(toy => <ToyPreview toy={toy} key={toy._id} onRemoveToy={onRemoveToy} />

        )}
    </section>
}