import { useState } from 'react'

export function valideaza(valori) {
  const erori = {}
  const oras = valori.oras.trim()
  const tara = valori.tara.trim()
  const zile = Number(valori.zile)

  if (oras.length < 2) {
    erori.oras = 'Orașul are cel puțin două caractere.'
  }

  if (!tara) {
    erori.tara = 'Țara este obligatorie.'
  }

  if (valori.zile === '' || Number.isNaN(zile) || zile < 1 || zile > 30) {
    erori.zile = 'Numărul de zile este între 1 și 30.'
  }

  return erori
}

export default function FormularDestinatie({ onAdd, seTrimite }) {
  const [valori, setValori] = useState({ oras: '', tara: '', zile: '' })
  const [erori, setErori] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValori((curent) => ({ ...curent, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const eroriGasite = valideaza(valori)
    setErori(eroriGasite)

    if (Object.keys(eroriGasite).length > 0) {
      return
    }

    try {
      await onAdd({
        oras: valori.oras.trim(),
        tara: valori.tara.trim(),
        zile: Number(valori.zile),
        vizitat: false,
      })
      setValori({ oras: '', tara: '', zile: '' })
      setErori({})
    } catch {
      return
    }
  }

  return (
    <form className="formular" onSubmit={handleSubmit} noValidate>
      <div className="camp">
        <input
          name="oras"
          aria-label="Oraș"
          type="text"
          placeholder="Oraș"
          value={valori.oras}
          onChange={handleChange}
          className={erori.oras ? 'invalid' : ''}
        />
        {erori.oras && <p className="eroare-camp">{erori.oras}</p>}
      </div>
      <div className="camp">
        <input
          name="tara"
          aria-label="Țară"
          type="text"
          placeholder="Țară"
          value={valori.tara}
          onChange={handleChange}
          className={erori.tara ? 'invalid' : ''}
        />
        {erori.tara && <p className="eroare-camp">{erori.tara}</p>}
      </div>
      <div className="camp">
        <input
          name="zile"
          aria-label="Zile"
          type="number"
          min="1"
          max="30"
          placeholder="Zile"
          value={valori.zile}
          onChange={handleChange}
          className={erori.zile ? 'invalid' : ''}
        />
        {erori.zile && <p className="eroare-camp">{erori.zile}</p>}
      </div>
      <button type="submit" disabled={seTrimite}>
        {seTrimite ? 'Se trimite...' : 'Adaugă'}
      </button>
    </form>
  )
}
