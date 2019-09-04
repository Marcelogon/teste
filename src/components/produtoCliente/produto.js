import React from 'react'
import CardProduto from './cardProduto'
import axios from 'axios'
import Cookies from 'js-cookie'
import {Button, Input, Modal} from 'antd'
import './produto.css'


export default class produto extends React.Component {
    constructor(props){
        super(props)
        this.onClickNao = this.onClickNao.bind(this);
        this.onClickSim = this.onClickSim.bind(this);
    }

    state = {
        data: [],
        descricao: 'Orçamento',
        visible: false,
        confirmLoading: false,
    }

    componentDidMount(){

        Cookies.set('continua','n')
           
        axios.get(`http://localhost:3001/dev/produtos/`)
        .then(res => {
          const data = res.data;
          this.setState({ data });
        })
      }

      showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = () => {
        this.onClickSim();
        Cookies.set('nomeOr',this.state.descricao)
        this.setState({
          
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };
      onChangeDescrição = event => {
          this.setState({ descricao: event.target.value });
         console.log('olha a descrição ai '+event.target.value) 
      }
      componentWillUnmount(){
       console.log("passo no unmont")
       Cookies.set('orcamentoa',Cookies.get('orcamentoid'))
       Cookies.remove('orcamentoid')
      }
      onClickNao(){
        Cookies.set('orcamentoid',Cookies.get('orcamentoa'))
        this.setState({visible : false})
    }
      onClickSim(){
        let axiosConfig = {
          headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin": "*",
          }
      }        
      const UserId = Cookies.get('userid');
      if(Cookies.get('orcamentoid') === undefined){

          axios.post(`http://localhost:3001/dev/orcamento/`, {
              idUsuario: UserId,
              descricao: this.state.descricao
          }, axiosConfig)
              .then(res => {
                  Cookies.set('orcamentoid', res.data.insertId);
                                  })
  }
}
      onClickCategoria = event =>{
        axios.get(`http://localhost:3001/dev/produtos/seletor/categoria/${event.target.name}`)
        .then(res => {
          const data = res.data;
          this.setState({ data });
        })
      }
      onClickPesquisa(value){
        axios.get(`http://localhost:3001/dev/produtos/${value}`)
        .then(res => {
          const data = res.data;
          this.setState({ data });
        })
      }
    
    render() {

      if(Cookies.get('orcamentoid') === undefined){
        return <div>
        <div className='divTopo'><Button type='danger' className='btnNovoOr' onClick={this.showModal}>Iniciar Orçamento</Button></div>
         <div className='divbtns'><Input.Search placeholder="Nome do Produto" onSearch={value => this.onClickPesquisa(value)} enterButton  style={{ width: 300, marginRight:150 }}/> <Button className='btnCategoria' onClick={this.onClickCategoria} name='CFTV'>CFTV</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Alarme'>Alarme</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Cerca elétrica'>Cerca</Button><Button  className='btnCategoria' onClick={this.onClickCategoria} name='Interfonia'>Interfonia</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Automatizador'>Automatizador</Button></div>
          {this.state.data.map((item) => <CardProduto  key={item.idProduto} prodId={item.idProduto} prodNome={item.nome} 
          prodImagem={item.imagem} prodDescricao={item.descricao} 
          prodValor={item.valor} prodMarca = {item.marca} prodCat = {item.categoria}
           prodSub = {item.sub} />)}
          <Modal
          title="Title"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>Informe o titulo do Orçamento:<Input placeholder="Orçamento para Marcelo Gonçalves" onChange={this.onChangeDescrição}></Input></p>
        </Modal>
      </div>
      }
        return (
            <div>
              <div className='divTopo'><b>{Cookies.get('nomeOr')}</b></div>
               <div className='divbtns'><Button type="danger"  onClick={this.onClickSim}>Novo Orçamento</Button> <Input.Search placeholder="Nome do Produto" onSearch={value => this.onClickPesquisa(value)} enterButton  style={{ width: 300, marginRight:150 }}/> <Button className='btnCategoria' onClick={this.onClickCategoria} name='CFTV'>CFTV</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Alarme'>Alarme</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Cerca elétrica'>Cerca</Button><Button  className='btnCategoria' onClick={this.onClickCategoria} name='Interfonia'>Interfonia</Button><Button className='btnCategoria' onClick={this.onClickCategoria} name='Automatizador'>Automatizador</Button></div>
                {this.state.data.map((item) => <CardProduto  key={item.idProduto} prodId={item.idProduto} prodNome={item.nome} 
                prodImagem={item.imagem} prodDescricao={item.descricao} 
                prodValor={item.valor} prodMarca = {item.marca} prodCat = {item.categoria}
                 prodSub = {item.sub} />)}
                
            </div>
        )
    }
}