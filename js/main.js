const form = document.querySelector('#novoItem')
const lista = document.querySelector('#lista')
const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach(element => {
  criaNovoElemento(element)
})

form.addEventListener('submit', event => {
  event.preventDefault()

  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const existe = itens.find(element => element.nome === nome.value)

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value
  }

  if (existe) {
    itemAtual.id = existe.id

    atualizaItem(itemAtual)

    itens[itens.findIndex(element => element.id === existe.id)] = itemAtual
  } else {
    itemAtual.id = itens[itens.length - 1] ? itens[itens.length - 1].id + 1 : 0

    criaNovoElemento(itemAtual)

    itens.push(itemAtual)
  }

  localStorage.setItem('itens', JSON.stringify(itens))

  nome.value = ''
  quantidade.value = ''
})

function criaNovoElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add('item')

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome
  novoItem.appendChild(botaoRemoverItem(item.id))

  lista.appendChild(novoItem)
}

function atualizaItem(item) {
  document.querySelector('[data-id="' + item.id + '"]').innerHTML =
    item.quantidade
}

function botaoRemoverItem(id) {
  const botaoRemove = document.createElement('button')
  botaoRemove.innerText = 'x'

  botaoRemove.addEventListener('click', function () {
    removerItem(this.parentNode, id)
  })
  return botaoRemove
}

function removerItem(tag, id) {
  tag.remove()

  itens.splice(itens.findIndex(element => element.id === id),1)


  localStorage.setItem('itens', JSON.stringify(itens))
}
