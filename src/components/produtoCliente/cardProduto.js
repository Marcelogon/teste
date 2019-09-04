import React from 'react'
import { Card, Icon, message} from 'antd';

import Cookies from 'js-cookie'
import axios from 'axios'
import {Link} from 'react-router-dom'


export default class cardProduto extends React.Component {
    constructor(props){
        super(props)
        this.onChangeNumber = this.onChangeNumber.bind(this);
        this.handleDescricao = this.handleDescricao.bind(this);
        this.handleCart = this.handleCart.bind(this);
        this.insereOrcamento = this.insereOrcamento.bind(this);
    }
    state = {
        content : '',
        quantidade: null,

    }
    componentDidMount(){
       // this.insereOrcamento()
    }
    handleDescricao(event){
       Cookies.set('idProduto',event.target.value)
       console.log(event.target.value)
    }
    onChangeNumber = event => {
        this.setState({ quantidade: event.target.value });
    }  

    insereOrcamento(){
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }        
        const UserId = Cookies.get('userid');
        if(Cookies.get('orcamentoid') === undefined){

            axios.post(`http://localhost:3001/dev/orcamento/`, {
                idUsuario: UserId
               
            }, axiosConfig)
                .then(res => {
                    Cookies.set('orcamentoid', res.data.insertId);
                
                                    })
               

    }}

    handleCart(){
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }        
            
        console.log( " OLHA AQUI ="+Cookies.get('orcamentoid'))

      
    axios.post(`http://localhost:3001/dev/orcamentop/`, {
        idProduto: this.props.prodId,
        idOrcamento: Cookies.get('orcamentoid'),
        qtxValor: this.props.prodValor,
        qtProduto: 1,
    }, axiosConfig)
        .then(res => {
            console.log(res);
                message.success('Produto no incluido!');
                axios.patch(`http://localhost:3001/dev/orcamento/valor/${Cookies.get('orcamentoid')}`,{
                    vlTotal : this.props.prodValor
                },axiosConfig).then(res => {
                    console.log(res.data)
                })
        })
    }
    
    render() {
        

        const caminho = "/uploads/produtos/"+this.props.prodImagem
        if(Cookies.get('orcamentoid') === undefined){
            return(<Card
                style={{ width: 260, float:'left', marginLeft:5, height:430}}
                cover={<img alt="" src={caminho} />}
                actions={[<Link to={`/detalheproduto/${this.props.prodId}`} ><Icon onClick={this.handleDescricao}  style={{ fontSize: '30px'}}  type="info-circle" /></Link>]}
            >
                <Card.Meta                  
                    title={this.props.prodNome}
                    description={this.props.prodDescricao+" "+this.props.prodValor}
                />
            </Card>)
        }
        return (
            <Card
                style={{ width: 250, float:'left', marginLeft:5, height:430}}
                cover={<img alt="" src={caminho} />}
                actions={[<Link to={`/detalheproduto/${this.props.prodId}`} ><Icon onClick={this.handleDescricao}  style={{ fontSize: '30px'}}  type="info-circle" /></Link>, <Icon style={{ fontSize: '30px'}} onClick={this.handleCart} type="shopping-cart" />]}
            >
                <Card.Meta                  
                    title={this.props.prodNome}
                    description={"Valor unitário = "+this.props.prodValor}
                />
            </Card>
        )
    }
}