export default function Cautare({ valoare, onChange }) {
  return (
    <div className="cautare">
      <input
        type="search"
        aria-label="Caută după oraș sau țară"
        placeholder="Caută după oraș sau țară"
        value={valoare}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
