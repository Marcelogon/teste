import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import '../carrinho/carrinho.css'
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
        axios.get(`http://localhost:3001/dev/assistencia/${Cookies.get('userid')}`)
            .then(res => {
                const assistencias = res.data;
                this.setState({ assistencias });
            })
    }
    onClickVisibleDestalhe(event){
        const key = event.target.name
        Cookies.set('assistenciaid', key)
       
     //   this.setState({
       //     visible: true
       // });
        
    }
    
    ReturnLinhas(){
        return this.state.assistencias.map((item) => 
        <tbody key={item.idAssistencia}>
        <tr>
        <td>{item.idAssistencia}</td>
        <td>{item.descricao}</td>
        <td>{item.situacao}</td>
        <td> <Moment format="YYYY/MM/DD HH:mm">{item.dtCadastro}</Moment></td>
        <td>
        <Link to={`/assistencias/historico/${item.idAssistencia}`}><button className="buttonTest" name={item.idAssistencia} onClick={this.onClickVisibleDestalhe}>Detalhes</button></Link>
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