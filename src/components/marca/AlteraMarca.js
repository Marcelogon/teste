import React from "react";
import axios from "axios";
import { Input } from "antd";



export default class CadastroMarca extends React.Component {
    state = {
        descricao: '',
        logo: '',
        id: '',
    }
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.idMarca

        }
    }

    handleChangeLogo = event => {
        this.setState({ logo: event.target.value });
    }

    handleChangeDescricao = event => {
        this.setState({ descricao: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const marca = {

            descricao: this.state.descricao,
            logo: this.state.logo,
            id: this.props.idMarca
        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.patch(`http://localhost:3001/dev/marca/${marca.id}`, {
            descricao: marca.descricao,
            logo: marca.logo
        }, axiosConfig)
            .then(res => {
                
                console.log(res);
                console.log(res.data); 
                this.props.action();               
            })
             
            
    }


    render() {


        return (
            <div>
                
            <form onSubmit={this.handleSubmit}>
                <label>
                    id da Marca:
            <Input type="text" className="idMarca"  value={this.props.idMarca} ></Input>
                </label>
                <label>
                    Nome da Marca:
<Input type="text" name="descricao" onChange={this.handleChangeDescricao} />
                </label>
                <label>
                    Caminho da logo:
<Input type="text" name="logo" onChange={this.handleChangeLogo} />
                </label>
                <button type="submit">Alterar</button>
                
            </form>
        </div>
        )
    }
}
