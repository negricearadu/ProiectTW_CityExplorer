import { useState } from 'react'
import { destinatii as destinatiiInitiale } from './data/destinatii.js'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Rezumat from './components/Rezumat.jsx'
import {
  adaugaDestinatie,
  getNevizitate,
  marcheazaVizitat,
  stergeDestinatie,
  totalZile,
} from './utils/destinatii.js'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState(destinatiiInitiale)
  const nevizitate = getNevizitate(destinatii)

  function handleToggle(id) {
    setDestinatii((curent) => marcheazaVizitat(curent, id))
  }

  function handleAdd(destinatie) {
    setDestinatii((curent) => adaugaDestinatie(curent, destinatie))
  }

  function handleDelete(id) {
    setDestinatii((curent) => stergeDestinatie(curent, id))
  }

  return (
    <main>
      <h1>City Explorer</h1>
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} />
      <ListaDestinatii
        destinatii={destinatii}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  )
}
