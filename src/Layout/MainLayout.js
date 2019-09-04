import React from 'react';
import 'antd/dist/antd.css';
import './MainLayout.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import {
    Layout, Menu, Icon,
} from 'antd';

import cadatroProduto from '../components/produto/CadastroProduto';
import assistencia from '../components/assistencia/dev/assistencia';
import assistenciaGeral from '../components/assistencia/dev/geral';
import assistenciaSituacao from '../components/assistencia/dev/alterarSituação';
import consultaProduto from '../components/produto/ConsultaProduto';
import cadastroMarca from '../components/marca/CadastroMarca';
import consultaMarca from '../components/marca/ConsultaMarca';
import homePage from '../components/login/homeDev';
import consultaCategoria from '../components/categoria/ConsultaCategoria';
import cadastroCategoria from '../components/categoria/CadastroCategoria';
import usuarios from './usuarios';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


export default class MainLayout extends React.Component {

    
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                         
                            style={{ lineHeight: '64px' }}
                        >
                            <Menu.Item key="1"><Link to='/dev/home'>Home Page</Link></Menu.Item>
                            <Menu.Item key="2"><Link to='/dev/usuarios'>Usuarios</Link></Menu.Item>
                            <Menu.Item key="3" onClick={this.props.back}>Voltar</Menu.Item>
                            
                        </Menu>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                               
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />Produto</span>}>
                                
                                    <Menu.Item key="2"><Link to='/dev/produtos/consulta'>Consulta</Link></Menu.Item>
                                    <Menu.Item key="3"><Link to='/dev/produtos/cadastro'>Cadastro</Link></Menu.Item>
                                    
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="android" />Marca</span>}>
                                    <Menu.Item key="5"><Link to='/dev/marca/consulta'>Consulta</Link></Menu.Item>
                                    <Menu.Item key="6"><Link to='/dev/marca/cadastro'>Cadastro</Link></Menu.Item>

                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />Categoria</span>}>
                                <Menu.Item key="7"><Link to='/dev/categoria/consulta'>Consulta</Link></Menu.Item>
                                <Menu.Item key="8"><Link to='/dev/categoria/cadastro'>Cadastro</Link></Menu.Item>
                                </SubMenu>
                                
                                <SubMenu key="sub4" title={<span><Icon type="notification" />Assistencia</span>}>
                                <Menu.Item key="9"><Link to='/dev/assistencia/geral'>Geral</Link></Menu.Item>
                                <Menu.Item key="10"><Link to='/dev/assistencia/consulta'>Entrada</Link></Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '0 24px 24px' }}>

                            <Content style={{
                                background: '#fff', padding: 24, margin: '20px 0', minHeight: 280,
                            }}
                            >
                             <Route path='/dev/home' exact component={homePage} />
                             <Route path='/dev/usuarios' exact component={usuarios} />
                             <Route path='/dev/marca/consulta' component={consultaMarca}/>
                             <Route path='/dev/marca/cadastro' component={cadastroMarca}/>
                             <Route path='/dev/categoria/consulta' component={consultaCategoria}/>
                             <Route path='/dev/categoria/cadastro' component={cadastroCategoria}/>
                             <Route path='/dev/produtos/cadastro' component={cadatroProduto}/>
                             <Route path='/dev/produtos/consulta' component={consultaProduto}/>
                             <Route path='/dev/assistencia/consulta' component={assistencia}/>
                             <Route path='/dev/assistencia/geral' component={assistenciaGeral}/>
                             <Route path='/dev/assistencia/altera/:handle' component={assistenciaSituacao}/>

            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );

        ;
    }


}
