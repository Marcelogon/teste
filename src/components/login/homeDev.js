import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './logcss.css'
import CurrencyFormat from 'react-currency-format'

export default class HomeDev extends React.Component{

    constructor(props){
        super(props)
        this.ReturnLinhasAssistencia = this.ReturnLinhasAssistencia.bind(this)
        this.ReturnLinhasOrcamento = this.ReturnLinhasOrcamento.bind(this)
    }
    state = {
        orçamentos : [],
        assistencias: []
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/dev/assistencia/pendete/today/`)
        .then(res => {
          const assistencias = res.data;
          this.setState({ assistencias });
        })
        axios.get(`http://localhost:3001/dev/orcamento/today/`)
        .then(res => {
          const orçamentos = res.data;
          this.setState({ orçamentos });
        })


    }

    ReturnLinhasOrcamento(){
        if(this.state.orçamentos === null){
            return <tbody >
            <tr>
            <td></td>
            <td>sem registro hoje</td>
            <td></td>
            <td></td>
            </tr>
            </tbody>
        }
        return this.state.orçamentos.map((item) => 
        <tbody key={item.idOrcamento}>
        <tr>
        <td>{item.nomeEmpresa}</td>
        <td>{item.dsOrcamento}</td>
        <td><CurrencyFormat value={item.vlTotal}  displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <div>{value}</div>} /></td>
        <td>
        <Link to={`/dev/assistencia/altera/${item.idOrcamento}`}><button className="buttonTest" >Detalhes</button></Link>
        </td>
        </tr>
        </tbody>)
    }

    ReturnLinhasAssistencia(){
        return this.state.assistencias.map((item) => 
        <tbody key={item.idAssistencia}>
        <tr>
        <td>{item.nomeEmpresa}</td>
        <td>{item.descricao}</td>
        <td>{item.situacao}</td>
        <td>
        <Link to={`/dev/assistencia/altera/${item.idAssistencia}`}><button className="buttonTest" >Situação</button></Link>
        </td>
        </tr>
        </tbody>)
    }


    render(){
    return(
        <div>
            <div className='divTabelaO'><span><b>Orçamentos de Hoje</b></span> <table className="TableProdutos">
                
                    <thead>
                        <tr>
                        <th>Nome Empresa</th>
                        <th>Descrição</th>
                        <th>Vl Total</th>                   
                        <th>Operation</th>
                        </tr>
                    </thead>
                    <this.ReturnLinhasOrcamento />
                </table></div>
            <div className='divTabelaA'><b>Assistências de Hoje</b><table className="TableProdutos">
                
                    <thead>
                        <tr>
                        <th>Nome Empresa</th>
                        <th>Descricao</th>
                        <th>Situação</th>                        
                        <th>Operation</th>
                        </tr>
                    </thead>
                    <this.ReturnLinhasAssistencia />
                </table></div>
        </div>
    )
}
}