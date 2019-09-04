import React from 'react'
import axios from 'axios'
import './carrinho.css'
import CurrencyFormat from 'react-currency-format'
import ModalView from './orcamento'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

export default class orcamentos extends React.Component {
    constructor(props){
        super(props)
        this.onClickVisibleDestalhe = this.onClickVisibleDestalhe.bind(this)
        this.ReturnLinhas = this.ReturnLinhas.bind(this)
        this.onClickVisibleFalse = this.onClickVisibleFalse.bind(this)
    }
    state = {
        data : [],
        visible : false,
    }   
    onClickVisibleFalse(){
        this.setState({visible:false})
        this.componentDidMount()
    }
    onClickVisibleDestalhe(event){
        const key = event.target.name
        console.log("essa é a key id Orc = "+key)
        Cookies.set('orcamentoid', key)
       
        this.setState({
            visible: true
        });
        
    }

    ReturnLinhas(){
        return this.state.data.map((item) => 
        <tbody key={item.idOrcamento}>
        <tr>
        <td>{item.idOrcamento}</td>
        <td>{item.dsOrcamento}</td>
        <td>{item.vlTotal} </td>
        <td>{item.situacao}</td>
        <td>{item.dtOrcamento}</td>
        <td>
        <Link to='/detalhes'><button className="buttonTest" name={item.idOrcamento} onClick={this.onClickVisibleDestalhe}>Detalhes</button></Link>
        
        </td>
        </tr>
        </tbody>)
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/dev/orcamento/${Cookies.get('userid')}`)
        .then(res => {
            const datadois = []
            const data = res.data;
            console.log(data)
            this.setState({ data });
            this.state.data.map((item) => <li key={item.idOrcamento} >{changeItem(item)}</li>)
            function changeItem(item) {
                item.vlTotal = <CurrencyFormat value={item.vlTotal} displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <span>{value}</span>} />
                datadois.push(item)
            }
            this.setState({ data: datadois })
        });
    }

    render(){
        if(this.state.visible){
            return <ModalView action={this.onClickVisibleFalse}/>
        } 
        return(
            <div>
               <table className="TableProdutos">
        <thead>
            <tr>
            <th>Id</th>     
            <th>Descricao</th>
            <th>Valor</th>
            <th>Situação</th>
            <th>Data</th>
            <th>Operation</th>
            </tr>
        </thead>
        <this.ReturnLinhas />
    </table>
            </div>
        )
    }
}