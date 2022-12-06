import { inAxios, webServiceURL } from '../config_axios.js'
import { useState, useEffect } from 'react'

import './lista_pizzaria.css'

const Lista_pizzaria = () => {
  const [pizzas, setPizzas] = useState([])

  const obterpizzaria = async () => {
    const Lista = await inAxios.get('pizzas')

    setPizzas(Lista.data)
  }

  useEffect(() => {
    obterpizzaria()
  }, [])
  console.log(webServiceURL + pizzas[0]?.avatar)
  const path = 'http://127.0.0.1:5000/'

  const excluir = async (id, nome) => {
    if (!window.confirm(`Confirma a exclusão da pizza"${nome}"?`)) {
      return
    }
    try {
      await inAxios.delete(`pizza/${id}`)
      setPizzas(pizzas.filter(piz => piz.id !== id))
    } catch (error) {
      alert(`Erro... Não foi possível excluir essa pizza: ${error}`)
    }
  }

  const alterar = async (id, nome, sabor, ingredientes, tipo, index) => {
    const novoNome = prompt(`Qual o nome correto da pizza "${nome}"?`)
    if (novoNome === null || novoNome === '') {
      return
    }
    try {
      await inAxios.put(`pizza/${id}`, {
        nome: novoNome,
        sabor,
        ingredientes,
        tipo
      })
      const pAlteracao = [...pizzas]
      pAlteracao[index].nome = novoNome
      setPizzas(pAlteracao)
    } catch (error) {
      alert(`Erro... Não foi possível alterar o nome: ${error}`)
    }
  }

  return (
    <div className="container">
      <h2 id="title">Lista dos Pizzas</h2>
      <table className="table table-striped table-bordered mt-4">
        <thead>
          <tr>
            <th className="border-3">Foto</th>
            <th className="border-3">Nome</th>
            <th className="border-3">Sabor</th>
            <th className="border-3">Ingredientes</th>
            <th className="border-3">Tipo</th>
            <th className="border-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizz, index) => (
            <tr key={pizz.id}>
              <td>
                <img
                  src={path + pizz.avatar}
                  alt={pizz.nome}
                  className="w-100 img-fluid"
                />
              </td>
              <td>{pizz.nome}</td>
              <td>{pizz.sabor}</td>
              <td>{pizz.ingredientes}</td>
              <td>{pizz.tipo}</td>
              <td className="text-center">
                <h4>
                  <i
                    className="bi bi-pencil-square text-success"
                    onClick={() =>
                      alterar(
                        pizz.id,
                        pizz.nome,
                        pizz.sabor,
                        pizz.ingredientes,
                        pizz.tipo,
                        index
                      )
                    }
                  ></i>
                  &ensp;
                  <i
                    className="bi bi-person-dash-fill text-danger"
                    onClick={() => excluir(pizz.id, pizz.nome)}
                  ></i>
                </h4>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Lista_pizzaria
