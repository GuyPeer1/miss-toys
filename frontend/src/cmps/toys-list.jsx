import { ToyPreview } from "./toy-preview.jsx"

export function ToysList({ toys, onRemoveToy }) {
    return <section className="toys-list">
        {toys.length > 0 && toys.map(toy =>
            <div className="toys-container" key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
            </div>
        )}
    </section>
}