export default function DestinatieCard({ destinatie, onToggle, onDelete }) {
  const { id, oras, tara, zile, vizitat } = destinatie

  return (
    <article className={vizitat ? 'card vizitat' : 'card'}>
      <h3>{oras}</h3>
      <p className="tara">{tara}</p>
      <p className="zile">{zile} zile</p>
      <div className="card-actions">
        <button type="button" onClick={() => onToggle(id)}>
          {vizitat ? 'Vizitat' : 'Marchează vizitat'}
        </button>
        <button className="button-delete" type="button" onClick={() => onDelete(id)}>
          Șterge
        </button>
      </div>
    </article>
  )
}
