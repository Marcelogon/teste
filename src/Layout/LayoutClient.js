import { Layout, Menu, Button} from 'antd';
import React from 'react'
import produtoView from '../components/produtoCliente/produto'
import detprodView from '../components/produtoCliente/detalheProduto'
import homeView from '../components/produtoCliente/home'
import cartView from '../components/carrinho/orcamentos'
import assistenciView from '../components/assistencia/assistenciaView'
import assistenciaLista from '../components/assistencia/assistencia'
import historicoView from '../components/assistencia/historico'
import detalheView from '../components/carrinho/orcamento'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import MainLayout from './MainLayout'
import MessengerCustomerChat from 'react-messenger-customer-chat';



const { Header, Content, Footer } = Layout;
export default class LayoutClient extends React.Component{
constructor(props){
  super(props)
  this.renderOther = this.renderOther.bind(this);
  this.renderBack = this.renderBack.bind(this);  
}
  state = {
    visible : null
}
renderOther(){
  this.setState({
        visible : true
  })
}
renderBack(){
this.setState({
  visible : false
})
}

render() {

      if(this.state.visible === true){
        return this.state.visible ? <MainLayout back={this.renderBack} /> : null
      }

    return(
      <div>
        
        <BrowserRouter>
  <Layout >
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', paddingTop:0 }}>
      <div className="logo"  ><img style={{width:120, height:40, marginBottom:50}} src="/uploads/diversos/logoPortal.jpg" alt=""/> </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><Link to='/'>Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to='/produtos'>Produtos</Link></Menu.Item>
        <Menu.Item key="3"><Link to='/assistencias'>Assistencias</Link></Menu.Item>
        <Menu.Item key="4"><Link to='/cart'>Orçamentos</Link></Menu.Item>


      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 90 }}>
      <div style={{ background: '#fff', paddingLeft: 24, paddingRight: 24, paddingTop: 3, minHeight: 540 }}>
      <Route  exact={true} path='/produtos' component={produtoView} />
      <Route  exact={true} path='/' component={homeView} />
      <Route  exact={true} path='/cart' component={cartView} />
      <Route  exact={true} path='/detalhes' component={detalheView} />
      <Route  exact={true} path='/detalheproduto/:handle' component={detprodView} />
      <Route  exact={true} path='/assistencias' component={assistenciView} />
      <Route  exact={true} path='/assistencias/lista/' component={assistenciaLista} />
      <Route  exact={true} path='/assistencias/historico/:handle' component={historicoView} />
      
      </div>
      <MessengerCustomerChat
    pageId="123456789"
    appId="987654321"
  />
    </Content>
    <Footer style={{ textAlign: 'center' }}>
    <MessengerCustomerChat
    pageId="123456789"
    appId="987654321"
  />
     Marcelo G. Família Portalcamp! <Button onClick={this.renderOther}>Dev</Button> 
    </Footer>
  </Layout>
  </BrowserRouter>
      </div>
        
);
;
}};