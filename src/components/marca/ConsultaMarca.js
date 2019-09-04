import React from 'react';
import { List, Card, Button } from 'antd';
import axios from 'axios';
import '../../App.css';
import AlteraMarca from "./AlteraMarca"



export default class CadastroMarca extends React.Component {
  constructor(props){
    super(props);
    this.changeState = this.changeState.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  state = {
    marcas: [],
    id: '',
    descricao: '',
    logo: '',
    divHidden: 'none',
    visible: false
  }
  changeState(){
    this.setState({visible : false})
    this.componentDidMount();
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/dev/marca/`)
      .then(res => {
        const marcas = res.data;
        this.setState({ marcas });
      })
  }


  excluiMarca = event => {

    this.setState({ id: event.target.title })
    console.log(this.state.id)
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };
    axios.delete(`http://localhost:3001/dev/marca/${this.state.id}`, axiosConfig)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })

    axios.get(`http://localhost:3001/dev/marca/`)
      .then(res => {
        const marcas = res.data;
        this.setState({ marcas });
      })
  }
  
  Mostralogo(props){
   const img = props.img  
   const caminho = "/uploads/logos/" ; 
   const concat = caminho+img;
    console.log(concat)
   return <img className="imgLogo" src={concat}  alt="" />
  }
  render() {


    return (
      <div>
       <div className="teste" >
    {this.state.visible ? <AlteraMarca idMarca={this.state.id} action={this.changeState} reset={this.componentDidMount}/> : null}
       </div>   
       
          
          <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.state.marcas}
          renderItem={item => (
            <List.Item>
              <Card title={item.descricao}
                extra={<div><Button title={item.idMarca} icon="delete" theme="twoTone" onClick={this.excluiMarca}></Button><span> </span>
                  <Button title={item.idMarca} icon="edit" theme="twoTone" onClick={(e) => {this.setState({visible : true, id : e.target.title})}}></Button> </div>}>
                  <this.Mostralogo img = {item.logo} />
              </Card>
            </List.Item>
          )}
        />
      </div>
    )
  }
}
