import React from 'react'
import {
    Form, Input, Button, Select
} from 'antd';
import Data from './dataCidades.json'
import axios from 'axios'

export default class cadastro extends React.Component {
    constructor(props){
        super(props)
        this.handleChangeEstado = this.handleChangeEstado.bind(this)
        this.SelectListEstado = this.SelectListEstado.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state = {
        
        estado : null,
        email :null, 
        senha: null,
        cnpj:null,
        nomeE:null,
        nomeP:null,
        telefone:null,
        cidade : null,
    }

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    }
    handleChangeSenha = event => {
        this.setState({ senha: event.target.value });
    }
    handleChangeCnpj = event => {
        this.setState({ cnpj: event.target.value });
    }
    handleChangeNomeE = event => {
        this.setState({ nomeE: event.target.value });
    }
    handleChangeNomeP = event => {
        this.setState({ nomeP: event.target.value });
    }
    handleChangeTelefone = event => {
        this.setState({ telefone: event.target.value });
    }
    handleChangeCidade = event => {
        this.setState({ cidade: event.target.value });
    }

    handleSubmit(){
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/usuario/`, {
            email : this.state.email,
            senha : this.state.senha,
            cpfCnpj : this.state.cnpj,
            nomeProprietario : this.state.nomeP,
            nomeEmpresa : this.state.nomeE,
            cidade : this.state.cidade,
            uf: this.state.estado,
            telefone : this.state.telefone
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

    }


    handleChangeEstado(value) {
        this.setState({
            estado: value
   
        })
        console.log(value)
    }


    SelectListEstado() {
        return (
            <div>
                <Select placeholder="Selecione o Estado" className="inputUsuario" onChange={this.handleChangeEstado}>
                    {Data.map((item) =>
                        <Select.Option key={item.sigla}
                         value={item.sigla} >{item.nome}</Select.Option>
                    )}
                </Select>
            </div>
        );
    }

    render() {

        return (
            <div className="divCadastro">
                <Form>
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='E-mail' onChange={this.handleChangeEmail} />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='Senha' onChange={this.handleChangeSenha} />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='CNPJ ou CPF' onChange={this.handleChangeCnpj} />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='Nome do Proprietário' onChange={this.handleChangeNomeP} />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='Nome da Empresa' onChange={this.handleChangeNomeE} />
                    <this.SelectListEstado />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='Cidade' onChange={this.handleChangeCidade} />
                    <Input className="inputUsuario" type="text" name="descricao" placeholder='Telefone' onChange={this.handleChangeTelefone} />
                    <Button type="primary" className="inputUsuario" onClick={this.handleSubmit}>Solicitar cadastro</Button>


                </Form>
            </div>
        )
    }
}