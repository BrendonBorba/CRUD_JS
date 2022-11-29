import header_pizzaria from './components/header_pizzaria.js'
import lista_pizzaria from './components/ListaEletronicos.js'
import inclusao_pizzaria from './components/InclusaoEletronicos.js'
import gerencia_pizzaria from './components/GerenciaEletronica.js'

import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <>
      <MenuSuperior />
      <Routes>
        <Route path="/" element={<lista_pizzaria />} />
        <Route path="inclusao" element={<inclusao_pizzaria />} />
        <Route path="gerencia" element={<gerencia_pizzaria />} />
      </Routes>
    </>
  )
}

export default App
