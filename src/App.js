import React, { useState } from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import gifCarregando from '../src/images/Spinner-1s-64px.gif'
import { MdClear, MdMoveToInbox } from "react-icons/md"

//JSX - EXTENSAO PARA SINTAXE JAVASCRIPT - Java Script eXtension
// Hook 
function App() {
  const [pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)
  const [idade, setIdade] = useState('')
  const [etnia, setEtnia] = useState('')
  const estiloIcone = { background: '#5162FF', fontsize: '1.5em' }

  function ListaPessoas() {
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
        alt="Pessoa Gerada por IA" />
    )
    return (
      <> {listagemPessoas}</>
    )
  }

  async function obterFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    const filtraEtnia = etnia.length > 0 ? `&ethnicity=${etnia}` : ''//a crase é p/ concatenar string com variavel
    const filtraIdade = idade.length > 0 ? `&age=${idade}` : ''

    let url =
      `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtraEtnia}${filtraIdade}&order_by=random`

    console.log(url)
    await fetch(url)
      .then(Response => Response.json())
      .then(data => {
        setPessoas(data.faces)
        console.log('Dado carregados com sucesso')
      })
      .catch(function (error) {
        console.error('Houve um problema na requisição: ' + error.message)
      })
    setCarregando(false)
  }
  return (
    <div className="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      { carregando && //condicionado
        <img src={gifCarregando} title="Aguarde..." alt="Aguarde, carregando dados" />
      }
      <div className="linha">
        <ListaPessoas />
      </div>

      <div className="linha">
        <label>Idade:</label>
        <select onChange={event => setIdade(event.target.value)}>
          <option value="">Todas</option> {/* Abre e fecha aspas sem espaço no meio*/}
          <option value="infant">Infantil</option>
          <option value="child">Criança</option>
          <option value="young-adult">Jovem</option>
          <option value="adult">Adulto</option>
          <option value="elderly">Idoso</option>
        </select>
        <label>Etnia:</label>
        <select onChange={e => setEtnia(e.target.value)}>
          <option value="">Todas</option>
          <option value="white">Branca</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Negra</option>
        </select>
      </div>

      <div className="linha">
        <button type='button' onClick={obterFoto}>
          <MdMoveToInbox style={estiloIcone} /> Obter imagens
        </button>
        {/* Exemplo de chamnada a uma arrow function*/}
        {pessoas.length > 0 &&
          <button type='button' onClick={() => setPessoas([])}>
            <MdClear style={estiloIcone} /> Limpar imagens
        </button>
        }
      </div>
    </div>
  )
}

export default App 