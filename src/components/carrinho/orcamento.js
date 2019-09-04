import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import './carrinho.css'
import {Button, Icon} from 'antd'
import {Link} from 'react-router-dom'
import ReactToPrint from "react-to-print";
import CurrencyFormat from 'react-currency-format'

 class Orcamento extends React.Component{
    constructor(props){
        super(props)
        this.ReturnLinhas = this.ReturnLinhas.bind(this)
        this.AlteraQuatidade = this.AlteraQuatidade.bind(this)
        this.handleChangeInputNumber = this.handleChangeInputNumber.bind(this)
        this.onClickSave = this.onClickSave.bind(this)
        this.RetornaTotal = this.RetornaTotal.bind(this)
        this.onClickVoltar = this.onClickVoltar.bind(this)
        this.onClickContinuar = this.onClickContinuar.bind(this)
         }
    state = {
        tot: 0 ,
        data : [],
        quantidade : null,
        visibleButton : false,
        value : null,
        visibleAlt : null,
        id : null,
        orcamento: [],
    }

    handleChangeInputNumber(event){
        const target = event.target;
        
        const name = target.name;
        this.setState({ value : event.target.value, id : name })
    
    }
    onClickSave(){
        axios.get(`http://localhost:3001/dev/orcamentop/orc/${this.state.id}`)
        .then(res => {
        const orcamento = res.data;       
        console.log("olha o state value = "+this.state.value)
        
        const novovalor = orcamento[0].valor * this.state.value
        
        var valorsub = novovalor - orcamento[0].valor    
        console.log("novovalor = "+novovalor+" valor sub ="+valorsub)

        if(orcamento[0].qtProduto > this.state.value){
            const qtChange = orcamento[0].qtProduto - this.state.value
            const newValor = qtChange * orcamento[0].valor    
            
            valorsub = -newValor
        }
        console.log("Alterei o valorsub ="+valorsub)
        
        axios.patch(`http://localhost:3001/dev/orcamento/valor/${Cookies.get('orcamentoid')}`,{
            vlTotal : valorsub 
        })
        .then(res => {
            console.log(res.data)
        })    

        axios.patch(`http://localhost:3001/dev/orcamentop/${this.state.id}`,{
            qtxValor : novovalor,
            qtProduto :this.state.value 
        })
        .then(res => {
            console.log(res.data)
            this.componentDidMount();
        }) 
    });
    }
    AlteraQuatidade(id){
         if(id.id === parseInt(this.state.id)){
            return <Button  className="btnSave" onClick={this.onClickSave} >ok</Button>
         }else{  
            return null
        }
    }
    onClickExcluir(event){
        console.log(event)
    }

    ReturnLinhas(){
        return this.state.data.map((item) => 
        <tbody key={item.idOrcamentoProduto}>
        <tr>
        <td>{item.idProduto}</td>
        <td>{item.nomeProduto}</td>
        <td><CurrencyFormat value={item.valor}  displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <div>{value}</div>} /></td>
        <td><input className="inputNumber" type="number" min={1} max={999} name={item.idOrcamentoProduto} defaultValue={item.qtProduto} onChange={this.handleChangeInputNumber} />
        <this.AlteraQuatidade id={item.idOrcamentoProduto} /> 
        </td>
        <td><CurrencyFormat value={item.qtxValor}  displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <div>{value}</div>} /></td>
        <td><button name={item.idOrcamentoProduto} value={item.qtxValor} onClick={this.onClickExcluir}>excluir</button></td>
        </tr>
        </tbody>)
         
    }
    RetornaTotal(){
        var soma = this.state.data.reduce(function(somaAux, numero){
            return somaAux + numero.qtxValor;
          }, 0);
        console.log(soma)
       
        return <span>{soma}</span>
    }
    onClickVoltar(){
        this.props.action()
    }
    componentDidMount(){
        axios.get(`http://localhost:3001/dev/orcamentop/${Cookies.get('orcamentoid')}`)
        .then(res => {
        
        const data = res.data;       
        console.log(data)
        this.setState({ data });
    });
    }

    onClickContinuar(){
        Cookies.set('continua','s')
        console.log("olha o id ai = "+Cookies.get('orcamentoid'))
    }

    render(){
        const title = this.state.orcamento;
        console.log(title)
        return(
            <div>
                 <Link to='/cart'><Button className="btnVoltar"  type="primary">
            <Icon type="left" />Voltar
          </Button></Link>
         
        <Link to="/produtos"><Button className="btnContinuar" onClick={this.onClickContinuar} type="primary">
          Continuar Orçamento <Icon type="right" />
          </Button></Link>
          <table className="TableProdutos">
        <thead>
            <tr>
            <th>Id</th>
            <th>Produto</th>
            <th>Valor Unitario</th>
            <th>Qtde.</th>
            <th>Preço</th>
            <th>Operation</th>
            </tr>
        </thead>
        <this.ReturnLinhas />
        <tbody>
               <tr>
                 <td colSpan='3'></td>
                 
                 <td colSpan='2'>{"total = "}<this.RetornaTotal /></td> 
                </tr>
        </tbody>
    </table>
            </div>

)
    }
}
export default class Example extends React.Component {
    render() {
      return (
        <div>
          <Orcamento ref={el => (this.componentRef = el)} />
          <ReactToPrint
            trigger={() => <Button icon='printer'>Imprimir</Button>}
            content={() => this.componentRef}
          />
        </div>
      );
    }
  }