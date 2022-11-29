import { inAxios, webServiceURL } from './config_axios'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

import './listagem.css'

export default function Listagem() {
  const [alimentos, setAlimentos] = useState([])
  const [show, setShow] = useState(false)
  const [id, setId] = useState(0)
  const [nome, setNome] = useState('')
  const [avatar, setAvatar] = useState('')
  const [sabor, setSabor] = useState('')
  const [ingredientes, setIngredientes] = useState('')
  const [tipo, setTipo] = useState('')
  const [nomeCli, setNomeCli] = useState('')
  const [emailCli, setEmailCli] = useState('')
  const [avaliacao, setAvaliacao] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = (id, nome, avatar, ingredientes, sabor) => {
    setId(id)
    setNome(nome)
    setAvatar(webServiceURL + avatar)
    setIngredientes(ingredientes)
    setSabor(sabor)
    setTipo(tipo)
    setShow(true)
  }

  const getAlimentos = async () => {
    try {
      const lista = await inAxios.get('pizzas')

      setAlimentos(lista.data)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }
  }

  useEffect(() => {
    getAlimentos()
  }, [])

  const confirmarAvaliacao = async () => {
    if (nomeCli === '' || emailCli === '' || avaliacao === '') {
      alert('Por favor, informe os dados para confirmar sua avaliação.')
      return
    }

    try {
      const avalia = await inAxios.post('avaliacoes', {
        pizza_id: id,
        nome: nomeCli,
        email: emailCli,
        avalicao: avaliacao
      })

      alert(avalia.data.msg)
    } catch (erro) {
      console.log(`Erro no acesso ao Servidor ${erro}`)
    }

    setNomeCli('')
    setEmailCli('')
    setAvaliacao('')

    setShow(false)
  }

  return (
    <div className="container py-3 mb-3 mt-3">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {alimentos.map(alimento => (
          <div className="col">
            <img
              src={`${webServiceURL}${alimento.avatar}`}
              alt="Pizza"
              className="w-100 img-fluid mb-3"
            />
            <h4 className="mt-1">
              {alimento.nome}
              <button
                className="btn btn-primary fw-bold py-2 px-4 float-end"
                onClick={() =>
                  handleShow(
                    alimento.id,
                    alimento.nome,
                    alimento.avatar,
                    alimento.ingredientes,
                    alimento.sabor
                  )
                }
              >
                Avaliar
              </button>
            </h4>
            <h5 className="mb-5">
              {alimento.ingredientes} - {alimento.sabor}
            </h5>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} className="modal-lg mt-5">
        <Modal.Header closeButton>
          <Modal.Title>Pizzaria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-6">
                <img
                  src={avatar}
                  alt={nome}
                  className="avaliaavatar img-fluid mt-3"
                />
              </div>
              <div className="col-6 mt-2">
                <h2>{nome}</h2>
                <h5>
                  <b>ingredientes:</b> {ingredientes}
                </h5>
                <h5>
                  <b>Sabor:</b> {sabor}
                </h5>
                <h4 className="text-light mt-4">
                  Informe seus dados para confirmar a avaliação:
                </h4>
                <div class="form-floating mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingName"
                    placeholder="Nome"
                    value={nomeCli}
                    onChange={e => setNomeCli(e.target.value)}
                  />
                  <label for="floatingName">Nome completo</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id="floatingEmail"
                    placeholder="E-mail"
                    value={emailCli}
                    onChange={e => setEmailCli(e.target.value)}
                  />
                  <label for="floatingEmail">E-mail para contato</label>
                </div>
                <div class="form-floating mb-3">
                  <input
                    type="number"
                    class="form-control"
                    id="floatingName"
                    placeholder="Avaliação"
                    value={avaliacao}
                    onChange={e => setAvaliacao(e.target.value)}
                  />
                  <label for="floatingName">
                    Avaliação de 0 a 10. Ex: 10.0
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarAvaliacao}>
            Confirmar Avaliação
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
