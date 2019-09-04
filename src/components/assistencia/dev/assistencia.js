import React from 'react'
import axios from 'axios'
import '../../carrinho/carrinho.css'
import {Link} from 'react-router-dom'
import Moment from 'react-moment'

export default class Assistencia extends React.Component{
     constructor(props){
         super(props)
         this.ReturnLinhas = this.ReturnLinhas.bind(this)
     }
    state = {
        assistencias : []
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/dev/assistencia/pendete`)
            .then(res => {
                const assistencias = res.data;
                this.setState({ assistencias });
                console.log(assistencias[5])
            })
    }
    
    ReturnLinhas(){
        return this.state.assistencias.map((item) => 
        <tbody key={item.idAssistencia}>
        <tr>
        <td>{item.idAssistencia}</td>
        <td>{item.nomeEmpresa}</td>
        <td>{item.descricao}</td>
        <td>{item.situacao}</td>
        <td> <Moment format="YYYY/MM/DD HH:mm">{item.dtCadastro}</Moment></td>
        <td>
        <Link to={`/dev/assistencia/altera/${item.idAssistencia}`}><button className="buttonTest" name={item.idAssistencia}>Situação</button></Link>
        </td>
        </tr>
        </tbody>)
    }

    render(){
        return(
            <div>
                <div>
                <table className="TableProdutos">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Nome Empresa</th>
                        <th>Descricao</th>
                        <th>Situação</th>
                        <th>Data</th>
                        <th>Operation</th>
                        </tr>
                    </thead>
                    <this.ReturnLinhas />
                </table>
            </div>
            </div>
        )
    }
}