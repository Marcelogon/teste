import React from 'react';
import axios from 'axios';
import { Input, Button, Form, Select, Divider } from 'antd';
import './tabela.css';

export default class CadastroCategoria extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.SelectList = this.SelectList.bind(this);
      }
    state = {
        categorias: [],
        selectedOption: null,
        idCategoria: '',
        nome: '',
        teste: '1',
        nomesub: ''
    }

    handleChangeDescricao = event => {
        this.setState({ nome: event.target.value });
    }
    
    handleChangeNomeSub = event => {
        this.setState({ nomesub: event.target.value });
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/dev/categoria/`)
            .then(res => {
                const categorias = res.data;
                this.setState({ categorias });
            })

    }


    handleSubmit = event => {
        event.preventDefault();

        const categoria = {
            nome: this.state.nome

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/categoria/`, {
            nome: categoria.nome
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    
    handleSubmitSub = event => {
        event.preventDefault();

        const subcategoria = {
            categoria: this.state.teste,
            nome: this.state.nomesub

        };

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/subcategoria/`, {
            nome: subcategoria.nome,
            categoria: subcategoria.categoria
        }, axiosConfig)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

handleChange(value){
    this.setState({
        teste: value
    })
}

    SelectList(props) {
        const numbers = props.categorias;
        return (
          <Select placeholder= "Selecione a Categoria"   onChange={this.handleChange}>
              
            {numbers.map((number) =>
              
              <Select.Option  key={number.idCategoria}
                        value={number.idCategoria} >{number.nome}</Select.Option>
            )}
          </Select>
        );
      }
   
    render() {
        return (
            <div className='divcadastro'>
                <Form>
                    <label>
                        <Divider orientation="left">Cadastro de Categoria:</Divider>
                        <Input type="text" name="descricao" placeholder='Nome da Categoria' onChange={this.handleChangeDescricao} />
                    </label>
                    <Button type="primary" onClick={this.handleSubmit} className='btnCadastro'>Salvar Categoria</Button>
                </Form>
                <hr></hr>
                <Form>
                    <label>
                        <Divider orientation="left">Cadastro de Subcategoria:</Divider>
                    </label>
                  
                    <this.SelectList categorias={this.state.categorias } action={this.handleChange}/>
                    <Input type="text" className="inputSub" placeholder='Nome da Subcategoria' onChange={this.handleChangeNomeSub} />
                    <Button type="primary" onClick={this.handleSubmitSub} className='btnCadastro'>Salvar Sub</Button>
                </Form>

            </div>
        )
    }
}