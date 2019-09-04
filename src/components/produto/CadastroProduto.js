import React from 'react';
import axios from 'axios';
import { Input, Button, Form, Select, Divider, Upload, Icon, message } from 'antd';
import '../categoria/tabela.css';
import CurrencyInput from 'react-currency-input';


export default class CadastroProduto extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeCategoria = this.handleChangeCategoria.bind(this);
        this.SelectListCategoria = this.SelectListCategoria.bind(this);
        
        this.handleChangeValor = this.handleChangeValor.bind(this);

        this.handleChangeSubcategoria = this.handleChangeSubcategoria.bind(this);
        this.SelectListSubcategoria = this.SelectListSubcategoria.bind(this);
        
        this.handleChangeMarca = this.handleChangeMarca.bind(this);
        this.SelectListMarca = this.SelectListMarca.bind(this);
    
    }
    state = {
        dataFile: [],
        fileList: [],
        data: [],
        marcas: [],
        categorias: [],
        subcategorias: [],
        
        idCat:'',
        nome: '',
        valor: 0,
        codigo:'',
        descricao:'',
        idMarca:'',
        idSubCat:'',
        visible: false,
        dis : "false"
    }

    handleChangeDescricao = event => {
        this.setState({ descricao: event.target.value });
    }

    handleChangeCodigo = event => {
        this.setState({ codigo: event.target.value });
    }
    handleChangeProduto = event => {
        this.setState({ nome: event.target.value });
    }
    handleChangeValor(event, maskedvalue, floatvalue) {
        this.setState({valor: maskedvalue});
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/dev/marca/`)
            .then(res => {
                const marcas = res.data;
                this.setState({ marcas });
            })

        axios.get(`http://localhost:3001/dev/categoria/`)
            .then(res => {
                const categorias = res.data;
                this.setState({ categorias });
            })


    }


    handleSubmit = event => {
        event.preventDefault();
        const p = this.state.fileList

        const produto = {
            nome: this.state.nome,
            descricao: this.state.descricao,
            marca: this.state.idMarca,
            categoria : this.state.idCat,
            subcategoria: this.state.idSubCat,
            cod: parseInt(this.state.codigo),
            valor: this.state.valor,
            imagem: p[0],
            
        };
        console.log(produto)
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/produtos/`, {
            nome: produto.nome,
            valor: produto.valor,
            descricao: produto.descricao,
            marca: produto.marca,
            categoria: produto.categoria,
            subcategoria: produto.subcategoria,
            cod: produto.cod,
            imagem: produto.imagem
        }, axiosConfig)
            .then(res => {
                
                console.log(res.data);
                const x = this.state.fileList;
                const y = res.data.insertId;
                x.map((item) => 
                axios.post(`http://localhost:3001/dev/foto/`,{
                idProduto : y,
                caminho : item
                },axiosConfig).then(res =>{
                    console.log(res.data)
                })
                )
                

            })
            this.componentDidMount();
            
        }
    
    handleChangeSubcategoria(value) {
        this.setState({
            idSubCat: value,
            
        })
    }
    
    SelectListSubcategoria(props) {
        const idCat = props.idCat
        
        if(this.state.dis === 'false'){
            axios.get(`http://localhost:3001/dev/subcategoria/${idCat}`)
            .then(res => {
                const data = res.data;
                this.setState({ data });
            })
        this.setState({dis:'true'})
        }


        const numbers = this.state.data;
        return (
            <Select placeholder="Selecione a Sub" className="inputProduto" onChange={this.handleChangeSubcategoria}>
                {numbers.map((number) =>
                    <Select.Option key={number.idSubCategoria}
                        value={number.idSubCategoria} >{number.nome}</Select.Option>
                )}
            </Select> );       
    }

    handleChangeMarca(value) {
        
        this.setState({
            idMarca: value
        })
    }

    SelectListMarca(props) {
        const numbers = props.marcas;
        return (
            <Select placeholder="Selecione a Marca" className="inputProduto" onChange={this.handleChangeMarca}>
                {numbers.map((number) =>
                    <Select.Option key={number.idMarca}
                        value={number.idMarca} >{number.descricao}</Select.Option>
                )}
            </Select> );       
    }

    handleChangeCategoria(value) {
        this.setState({
            idCat: value,
            visible : true,
            dis: 'false'

        })
    }



    SelectListCategoria(props) {
        const numbers = props.categorias;

            return (
                <div>
                    <Select placeholder="Selecione a Categoria" className="inputProduto" onChange={this.handleChangeCategoria}>
                    {numbers.map((number) =>
                        <Select.Option key={number.idCategoria}
                            value={number.idCategoria} >{number.nome}</Select.Option>
                    )}
                </Select>
                {this.state.visible ? <this.SelectListSubcategoria idCat={this.state.idCat} /> : <div>pick categoria</div>} 
                </div>
                 );
        
               
    }

    onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {  
          console.log(info.file);
          const arrayF = this.state.dataFile
          const array = this.state.fileList
          array.push(info.file.name)
          arrayF.push(info.file)
            this.setState({
                fileList: array,
                dataFile: arrayF
            })
            const formData = new FormData();
            
        formData.append('selectedFile',info.file.originFileObj);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3001/dev/produtos/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });

          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }}

    render() {
        
const props = {
    action: '//jsonplaceholder.typicode.com/posts/  ',
    listType: 'picture',
    defaultFileList: [...this.state.fileList], 
       
  };
        return (
            <div className='divcadastro'>
                <Form>

                    <Divider orientation="left">Cadastro de Produto:</Divider>
                    <Input className="inputProduto" type="text" name="descricao" placeholder='Nome do Produto' onChange={this.handleChangeProduto} />
                    <Input.TextArea type="text" className="inputProduto" placeholder='Descrição do produto' onChange={this.handleChangeDescricao} />
                    <span>Valor: <CurrencyInput decimalSeparator="," thousandSeparator="." className="inputProduto" value={this.state.valor} placeholder="valor" onChangeEvent={this.handleChangeValor}/></span> 
                    <this.SelectListMarca marcas={this.state.marcas} />
                    <this.SelectListCategoria categorias={this.state.categorias} />
                   
                    
                    <Input type="text" className="inputProduto" placeholder="Codigo sistema" onChange={this.handleChangeCodigo} />
                    
                    <Divider orientation="right">Fotos:</Divider>
                    <Upload {...props} onChange={(info)=>this.onChange(info)} >
                    <Button>
                    <Icon type="upload" /> Upload
                    </Button>
                    </Upload>
                    <Button type="primary" onClick={this.handleSubmit} className="inputProdutoBtn">Salvar Produto</Button>
                
                </Form>

            </div>
        )
    }
}