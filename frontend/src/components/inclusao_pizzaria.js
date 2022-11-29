import { useState } from 'react'
import { inAxios } from '../config_axios'

import './inclusao_pizzaria.css'

export const inclusao_pizzaria = () => {
  const [nome, setNome] = useState('')
  const [sabor, setSabor] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [tipo, setTipo] = useState('')
  const [avatar, setAvatar] = useState(null)

  const enviarDados = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('nome', nome)
    formData.append('sabor', sabor)
    formData.append('ingredientes', ingredientes)
    formData.append('tipo', tipo)
    formData.append('avatar', avatar)
    formData.append('admin_id', 1)

    try {
      const inc = await inAxios.post('pizza', formData)
      alert(`Ok! Inserido com sucesso. Código: ${inc.data.id}`)
    } catch (erro) {
      alert(`Erro: ${erro}`)
    }
  }

  const limparCampos = () => {
    setNome('')
    setSabor('')
    setIngredientes('')
    setTipo('')
    setAvatar('')
  }

  return (
    <form
      className="container col-5 mt-3 border rounded-3"
      onSubmit={enviarDados}
      onReset={limparCampos}
    >
      <h2 id="title">Inclusão de Pizzas</h2>
      <div className="mb-3">
        <label htmlFor="nome" className="form-label">
          Nome da Pizza:
        </label>
        <input
          type="text"
          className="form-control"
          id="nome"
          placeholder="Nome da Pizza"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="sabor" className="form-label">
          Sabor:
        </label>
        <input
          type="text"
          className="form-control"
          id="sabor"
          placeholder="sabor da Pizza"
          value={sabor}
          onChange={e => setSabor(e.target.value)}
          required
        />
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="ingredientes" className="form-label">
            Ingredientes:
          </label>
          <input
            type="text"
            className="form-control"
            id="ingredientes"
            placeholder="Ingredientes da Pizza"
            value={ingredientes}
            onChange={e => setIngredientes(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
      </div>
      <div className="col-md-4">
        <label htmlFor="tipo" className="form-label">
          Tipo:
        </label>
        <input
          type="text"
          className="form-control"
          id="tipo"
          placeholder="Tipo da Pizza"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div className="col-md-8">
        <label htmlFor="avatar" className="form-label">
          avatar:
        </label>
        <input
          type="file"
          className="form-control"
          id="avatar"
          placeholder="avatar da Pizza"
          onChange={e => setAvatar(e.target.files[0])}
          required
        />
      </div>
      <div className="mb-3 d-md-flex justify-content-md-end">
        <button type="submit" className="btn btn-primary btn-lg px-5">
          Adicionar
        </button>
        <button type="reset" className="btn btn-danger btn-lg px-5 ms-3">
          Limpar
        </button>
      </div>
    </form>
  )
}
