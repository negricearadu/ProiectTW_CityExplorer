import { useEffect, useState } from 'react'
import { getDestinatii } from '../api/destinatii.js'

export default function PanouStatistici() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')

  useEffect(() => {
    async function incarca() {
      try {
        const date = await getDestinatii()
        setDestinatii(date)
      } catch (error) {
        setEroare(error.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [])

  if (incarcare) {
    return <p className="stare">Se încarcă statisticile...</p>
  }

  if (eroare) {
    return <p className="stare eroare">Statistici indisponibile: {eroare}</p>
  }

  const filtrate = destinatii.filter((destinatie) => destinatie.zile >= Number(prag))
  const totalZile = filtrate.reduce((suma, destinatie) => suma + destinatie.zile, 0)
  const medie = filtrate.length === 0 ? 0 : totalZile / filtrate.length

  return (
    <section className="panou">
      <h2>Statistici</h2>
      <label>
        Cel puțin{' '}
        <input
          type="number"
          value={prag}
          onChange={(event) => setPrag(event.target.value)}
        />{' '}
        zile
      </label>
      {filtrate.length === 0 ? (
        <p className="gol">Nicio destinație cu cel puțin {prag} zile.</p>
      ) : (
        <ul>
          <li>Destinații: {filtrate.length}</li>
          <li>Total zile: {totalZile}</li>
          <li>Media: {medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}
