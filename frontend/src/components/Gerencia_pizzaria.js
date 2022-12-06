import { inAxios } from '../config_axios.js'
import { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts'

import './gerencia_pizzaria.css'

export const options = {
  title: 'Porcentagem(%)  de Pizzas por tipo'
}

export const GERENCIA_PIZZARIA = () => {
  const [gerais1, setGerais1] = useState(0)
  const [gerais2, setGerais2] = useState(0)
  const [gerais3, setGerais3] = useState(0)
  const [gerais4, setGerais4] = useState(0)
  // const [pedidoDia, setPedidoDia] = useState([])
  const [tipo, setTipo] = useState([])
  const [sabor, setSabor] = useState([])

  const obterDados = async () => {
    const dadosGerais1 = await inAxios.get('pizzas/pesquisa/dadosgerais')
    const dadosGerais2 = await inAxios.get('garcom/pesquisa/dadosgerais')
    const dadosGerais3 = await inAxios.get('clientes/pesquisa/dadosgerais')
    const dadosGerais4 = await inAxios.get('pedidos/pesquisa/dadosgerais')
    const dadosTipo = await inAxios.get('pizzas/pesquisa/tipo')
    // const dadosData = await inAxios.get('pedidos/pesquisa/dia')
    const dadosSabor = await inAxios.get('pizzas/sabor')
    setGerais1(dadosGerais1.data)
    setGerais2(dadosGerais2.data)
    setGerais3(dadosGerais3.data)
    setGerais4(dadosGerais4.data)

    const data3 = [['sabor', 'Sabor', { role: 'style' }]]

    const data2 = [['tipo', 'Tipos de pizzas']]

    // const data = [['Pedidos', 'Pedidos', { role: 'style' }]]

    const cores = ['#D02090', '#32CD32', '#4169E1', '#D2691E', '#00CED1']

    dadosTipo.data.map(tipo => data2.push([tipo.tipo, tipo.num]))

    // dadosData.data.map((dat, i) => data.push([dat.dia, dat.num, cores[i]]))

    dadosSabor.data.map((sabor, i) =>
      data3.push([sabor.nome, sabor.sabor, cores[i]])
    )

    setTipo(data2)
    // setPedidoDia(data)
    setSabor(data3)
  }

  useEffect(() => {
    obterDados()
  }, [])

  return (
    <div className="container">
      <h2 id="title" className="my-3">
        Dados Gerenciais do Sistema
      </h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-success fs-2 fw-bold p-3 my-2">
                {gerais1.num}
              </span>
            </div>
            <h5 className="my-4">Nº de Pizzas Cadastradas</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span
                id="br"
                className="badge text-bg-success fs-2 fw-bold p-3 my-2"
              >
                {gerais2.num}
              </span>
            </div>
            <h5 className="my-4">Nº de Garçons Cadastrados</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-success fs-2 fw-bold p-3 my-2">
                {gerais3.num}
              </span>
            </div>
            <h5 className="my-4">Nº de Clientes Cadastrados</h5>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center border-primary">
            <div className="card-header border-primary">
              <span className="badge text-bg-success fs-2 fw-bold p-3 my-2">
                {gerais4.num}
              </span>
            </div>
            <h5 className="my-4">Nº de Pedidos Cadastrados</h5>
          </div>
        </div>
      </div>

      <h4 className="preco mt-5 ms-5">Gráfico de Eletrônicos por Preço</h4>
      <Chart chartType="ColumnChart" width="100%" height="400px" data={sabor} />
      {/* 
      <h4 className="mt-5 ms-5">
        Gráfico de Avaliações dos Eletrônicos por Data{' '}
      </h4>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={pedidoDia}
      /> */}

      <Chart
        chartType="PieChart"
        data={tipo}
        options={options}
        width={'100%'}
        height={'400px'}
      />
    </div>
  )
}
