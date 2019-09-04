import React from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import {
    Form, Icon, Input, Button
  } from 'antd';
import './logcss.css'

import CadastroView from './cadastro'

export default class login extends React.Component{
    constructor(props){
        super(props)
        this.handleChangeVisibleCadastro = this.handleChangeVisibleCadastro.bind(this)
    }
    state = {
        visibleClient: false,
        visibleCadastro : false,
        email : null,
        senha : null,
        user : null,
    }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    }
    handleChangeSenha = event => {
        this.setState({ senha: event.target.value });
    }
    
    
    handleChangeVisibleCadastro(){
        this.setState({visibleCadastro : true})
    }

    handleSubmit = (e) => {
        
        e.preventDefault();
        
        
        
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        Axios.get(`http://localhost:3001/dev/usuario/${this.state.email}/${this.state.senha}`, axiosConfig)
        .then(res => {
            console.log(res.data.length);
            const user = res.data;
           
            if(res.data.length !== 0){
                Cookies.set('userid', user[0].idUsuario);
                this.props.actionC()
                        } else {
                alert("Email ou Senha incorreta")
            }
        })
    }

    render(){
        if(this.state.visibleCadastro){
            return <CadastroView/>
        }

        return(
            <div className="divLog">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleChangeEmail} placeholder="Email" />
        </Form.Item>
        <Form.Item>   
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={this.handleChangeSenha} placeholder="Senha" />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="/esqueci">Esqueci a senha</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Entrar
          </Button>
          Ou <Button className="btnCadastro" onClick={this.handleChangeVisibleCadastro} >cadastre-se agora</Button> 
        </Form.Item>
      </Form>
    
            </div>
        )
    }
}