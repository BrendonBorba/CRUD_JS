const divProduct = document.querySelector('.divProduct')
const spanBadge = document.querySelector('span.position-absolute')
let itemsComprados

divProduct.addEventListener('click', e => {
  if (e.target.classList.contains('btAdicionar')) {
    // "captura" o elemento pai do botão que foi clicado
    const div = e.target.parentElement
    // console.log(div)
    const tagH1 = div.querySelector('h1')

    const id = tagH1.getAttribute('data-id')

    itemsComprados.push(id)

    spanBadge.innerText = itemsComprados.length

    localStorage.setItem('Products', itemsComprados.join(';'))
  }
})
