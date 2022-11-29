import './Titulo.css'

function Titulo() {
  return (
    <div className="container-fluid text-white">
      <div className="row align-items-center">
        <div className="col-sm-4 col-md-3 text-center">
          <img src="logo2.png" alt="Logo da Fenadoce" className="logo" />
        </div>
        <div className="col-sm-8 col-md-6 text-center">
          <h1>Pizzaria</h1>
        </div>
      </div>
    </div>
  )
}

export default Titulo
