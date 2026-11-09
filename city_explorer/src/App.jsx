import { useEffect, useState } from 'react'
import {
  deleteDestinatie,
  getDestinatii,
  patchVizitat,
  postDestinatie,
} from './api/destinatii.js'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Cautare from './components/Cautare.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Rezumat from './components/Rezumat.jsx'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  useEffect(() => {
    async function incarca() {
      setIncarcare(true)
      setEroare(null)

      try {
        const raspuns = await getDestinatii(pagina)
        const lista = Array.isArray(raspuns) ? raspuns : raspuns.data
        setDestinatii(lista)
        setTotalPagini(Array.isArray(raspuns) ? 1 : raspuns.pages || 1)
      } catch (error) {
        setEroare(error.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [pagina])

  const nevizitate = getNevizitate(destinatii)
  const textCautare = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (destinatie) =>
      destinatie.oras.toLowerCase().includes(textCautare) ||
      destinatie.tara.toLowerCase().includes(textCautare),
  )

  async function handleToggle(id) {
    const destinatie = destinatii.find((element) => element.id === id)

    if (!destinatie) {
      return
    }

    try {
      const salvata = await patchVizitat(id, !destinatie.vizitat)
      setDestinatii((curent) =>
        curent.map((element) => (element.id === id ? salvata : element)),
      )
    } catch (error) {
      setEroare(error.message)
    }
  }

  async function handleAdd(destinatie) {
    setSeTrimite(true)
    setEroare(null)

    try {
      const salvata = await postDestinatie(destinatie)
      setDestinatii((curent) => [...curent, salvata])
    } catch (error) {
      setEroare(error.message)
      throw error
    } finally {
      setSeTrimite(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDestinatie(id)
      setDestinatii((curent) => curent.filter((destinatie) => destinatie.id !== id))
    } catch (error) {
      setEroare(error.message)
    }
  }

  if (incarcare) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare">Se încarcă destinațiile...</p>
      </main>
    )
  }

  if (eroare && destinatii.length === 0) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>
      </main>
    )
  }

  return (
    <main>
      <h1>City Explorer</h1>
      {eroare && <p className="stare eroare">A apărut o eroare: {eroare}</p>}
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={setCautare} />
      {afisate.length === 0 && textCautare ? (
        <p className="gol">Niciun rezultat pentru „{cautare}”.</p>
      ) : (
        <ListaDestinatii
          destinatii={afisate}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      )}
      <div className="paginare">
        <button
          type="button"
          disabled={pagina === 1}
          onClick={() => setPagina((curent) => curent - 1)}
        >
          Înapoi
        </button>
        <span>pagina {pagina} din {totalPagini}</span>
        <button
          type="button"
          disabled={pagina === totalPagini}
          onClick={() => setPagina((curent) => curent + 1)}
        >
          Înainte
        </button>
      </div>
    </main>
  )
}
