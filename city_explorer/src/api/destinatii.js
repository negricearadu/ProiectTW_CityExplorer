const API_URL = 'http://localhost:3001'

async function verificaRaspuns(response) {
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }

  return response
}

export async function getDestinatii(pagina) {
  const parametri = pagina ? `?_page=${pagina}&_per_page=20` : ''
  const response = await fetch(`${API_URL}/destinatii${parametri}`)

  await verificaRaspuns(response)
  return response.json()
}

export async function postDestinatie(destinatie) {
  const response = await fetch(`${API_URL}/destinatii`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(destinatie),
  })

  await verificaRaspuns(response)
  return response.json()
}

export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })

  await verificaRaspuns(response)
  return response.json()
}

export async function deleteDestinatie(id) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'DELETE',
  })

  await verificaRaspuns(response)
}
