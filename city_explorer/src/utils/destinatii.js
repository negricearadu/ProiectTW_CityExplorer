export const getNevizitate = (list) => list.filter((destinatie) => !destinatie.vizitat)

export const totalZile = (list) => list.reduce((total, destinatie) => total + destinatie.zile, 0)

export const marcheazaVizitat = (list, id) =>
  list.map((destinatie) =>
    destinatie.id === id ? { ...destinatie, vizitat: !destinatie.vizitat } : destinatie,
  )

export const adaugaDestinatie = (list, destinatie) => [...list, destinatie]

export const stergeDestinatie = (list, id) => list.filter((destinatie) => destinatie.id !== id)

export const nr = (numar, cuvant) =>
  numar % 100 >= 20 ? `${numar} de ${cuvant}` : `${numar} ${cuvant}`
