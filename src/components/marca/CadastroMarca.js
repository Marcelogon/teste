import React from 'react';
import axios from 'axios';
import { Input, Button, Form } from 'antd';
import './marca.css';

export default class CadastroMarca extends React.Component {
    state = {
        selectedFile : null,
        descricao: 'teste',
        logo: 'teste',
        foto:''
    }

    handleChangeDescricao = event => {
        this.setState({ descricao: event.target.value });
    }
    handleChangeLogo = event => {
        this.setState({ logo: event.target.value });
    }

    handleChangefoto = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        console.log(event.target.files[0])
    }

    onFormSubmit = event => {
        event.preventDefault();
        const {selectedFile} = this.state;
        const formData = new FormData();
        formData.append('selectedFile',selectedFile);
        console.log(formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/dev/foto/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }



    handleSubmit = event => {
        event.preventDefault();

        const marca = {
            descricao: this.state.descricao,
            logo: this.state.logo

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/marca/`, {
            descricao: marca.descricao,
            logo: marca.logo
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className='divcadastro'>
                <Form >
                    <label>
                        Nome da Marca:
            <Input type="text" name="descricao" onChange={this.handleChangeDescricao} />
                    </label>
                    <label>
                        Caminho da logo:
            <Input type="text" name="logo" onChange={this.handleChangeLogo} />
                    </label>
                    <Button type="primary" onClick={this.handleSubmit} className="btnCadastro">Add</Button>
                </Form>
                <form  onSubmit={this.onFormSubmit}>
                    <input type="file" name="file" onChange={this.handleChangefoto} />
                    <input type='submit' value='Upload!' />
                </form>
            </div>
        )
    }
}