import React from 'react'
import { Input, Button, Form, Divider } from 'antd';
import axios from 'axios'
import './assistencia.css';

export default class alterarSituacao extends React.Component{
   state = {
       situacao: []
   }
    handleChangeDescricao = event => {
        this.setState({ situacao: event.target.value });
    }

    handleSubmit = event => {
        const {handle} = this.props.match.params
        event.preventDefault();

       

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/historico/`, {
            descricao: this.state.situacao,
            id : handle
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        axios.patch(`http://localhost:3001/dev/assistencia/${handle}`, {
            situacao: this.state.situacao
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
   
    
    render(){
        const {handle} = this.props.match.params
        return(
            <div className='divaltera'>
            <Form>
                <label>
                    <Divider orientation="left">Alterar Situação da Ass: {handle}</Divider>
                    <Input type="text" name="descricao" placeholder='Descrição da nova Situação' onChange={this.handleChangeDescricao} />
                </label>
                <Button type="primary" onClick={this.handleSubmit} className='btnCadastro'>Inserir Situação</Button>
            </Form>
            

        </div>

        )
    }
}