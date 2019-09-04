import { Layout, Menu} from 'antd';
import React from 'react'
import LayoutClient from './LayoutClient'
import LoginView from '../components/login/login'
import Cookies from 'js-cookie'


const { Header, Content, Footer } = Layout;
export default class HomePage extends React.Component{
constructor(props){
  super(props)
  this.changeVisible = this.changeVisible.bind(this);
  this.changeVisibleClient = this.changeVisibleClient.bind(this);
  }
  state = {
    visible : false,
    visibleClient : false,
}
componentDidMount(){
  Cookies.remove('orcamentoid')
}

changeVisible(){
    this.setState({visible : !this.state.visible})
    console.log("passou aqui")
}

changeVisibleClient(){
    this.setState({visibleClient : !this.state.visibleClient})
}

render() {

      if(this.state.visibleClient === true){
        return  <LayoutClient/> 
      }

    return(
      <div>
  <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo"  ><img style={{width:120, height:40, marginBottom:50}} src="/uploads/diversos/logoPortal.jpg" alt=""/> </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px', marginTop: 95 }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 540 }}>
      {!this.state.visible ? <LoginView  action={this.changeVisible} actionC={this.changeVisibleClient} /> : null}
      
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
     Marcelo G. Família Portalcamp! 
    </Footer>
  </Layout>
      </div>
);
;
}};