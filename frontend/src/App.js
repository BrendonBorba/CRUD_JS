import HEADER_PIZZARIA from './components/Header_pizzaria.js'
import LISTA_PIZZARIA from './components/Lista_pizzaria.js'
import INCLUSAO_PIZZARIA from './components/Inclusao_pizzaria.js'
import { GERENCIA_PIZZARIA } from './components/Gerencia_pizzaria.js'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <HEADER_PIZZARIA />
      <Routes>
        <Route path="/" element={<LISTA_PIZZARIA />} />
        <Route path="inclusao" element={<INCLUSAO_PIZZARIA />} />
        <Route path="gerencia" element={<GERENCIA_PIZZARIA />} />
      </Routes>
    </>
  )
}

export default App
