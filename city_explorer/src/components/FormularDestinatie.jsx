import { useState } from 'react'

export default function FormularDestinatie({ onAdd }) {
  const [oras, setOras] = useState('')
  const [tara, setTara] = useState('')
  const [zile, setZile] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!oras.trim() || !tara.trim()) {
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      oras: oras.trim(),
      tara: tara.trim(),
      zile: Number(zile) || 0,
      vizitat: false,
    })

    setOras('')
    setTara('')
    setZile('')
  }

  return (
    <form className="formular" onSubmit={handleSubmit}>
      <input
        aria-label="Oraș"
        type="text"
        placeholder="Oraș"
        value={oras}
        onChange={(event) => setOras(event.target.value)}
      />
      <input
        aria-label="Țară"
        type="text"
        placeholder="Țară"
        value={tara}
        onChange={(event) => setTara(event.target.value)}
      />
      <input
        aria-label="Zile"
        type="number"
        min="1"
        placeholder="Zile"
        value={zile}
        onChange={(event) => setZile(event.target.value)}
      />
      <button type="submit">Adaugă</button>
    </form>
  )
}
