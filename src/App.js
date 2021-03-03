import React, {useState} from 'react'
import { ReactComponent as Robot } from '../src/images/robot.svg'
import './App.css'
import gifCarregando from '../src/images/Spinner-1s-64px.gif'

//JSX - EXTENSAO PARA SINTAXE JAVASCRIPT - Java Script eXtension
// Hook 
function App(){
  const[pessoas, setPessoas] = useState([])
  const [carregando, setCarregando] = useState(false)

  function ListaPessoas (){
    const listagemPessoas = pessoas.map((pessoa)=>
    <img key={pessoa.id} src={pessoa.urls[4][512]} title="Gerada por IA"
      alt="Pessoa Gerada por IA" />
    )
    return(
      <> {listagemPessoas}</>
    )
  }

  async function obterFoto(){
    setCarregando(true)
    let url = "https://api.generated.photos/api/v1/faces?api_key=i39-LxaBP5N1oCDM_wg4rQ"
    await fetch(url)
    .then(Response => Response.json())
    .then(data => {
      setPessoas(data.faces)
      console.log('Dado carregados com sucesso')
    })
    .catch(function (error){
      console.error('Houve um problema na requisição: '+error.message)
    })
    setCarregando(false)
  }
  return(
    <div className="App">
      <h1>Gerador de Fotos via IA</h1>
      <Robot />
      { carregando && 
      <img src={gifCarregando} title="Aguarde..." alt="Aguarde, carregando dados"/>
      }
      <div className="fotos">
        <ListaPessoas/>
      </div>

      <button type='button' onClick={obterFoto}>
        Obter imagens
      </button>
    </div>
  )
}

export default App 