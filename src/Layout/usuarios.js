import React from 'react'
import axios from 'axios'

export default class usuarios extends React.Component{
    constructor(props){
        super(props);
        this.ReturnLinhasAssistencia = this.ReturnLinhasAssistencia.bind(this)
    }
    state = {
        data : []
    }

    componentDidMount(){
        axios.get(`http://localhost:3001/dev/usuario/`)
        .then(res => {
            const user = res.data;
            this.setState({data : user})
        })
    }

    changeSituacao = event =>{
        console.log('OLHA O X AQUI - '+event.target.name)
        axios.patch(`http://localhost:3001/dev/usuario/${event.target.name}`)
            .then(
                res => {
                    console.log(res);
                    console.log(res.data);                
                }
        )    }


    ReturnLinhasAssistencia(){
        return this.state.data.map((item) => 
        <tbody key={item.idUsuario}>
        <tr>
        <td>{item.nomeEmpresa}</td>
        <td>{item.nomeProprietario}</td>
        <td>{item.email}</td>
        <td>{item.cidade}</td>
        <td>{item.situacao}</td>
        <td>
        <button className="buttonTest" name={item.idUsuario} onClick={this.changeSituacao}>Situação</button>
        </td>
        </tr>
        </tbody>)
    }
    render(){
        return(
        <div>
            <table className="TableProdutos">
                
                <thead>
                    <tr>
                    <th>Nome Empresa</th>
                    <th>Nome Proprietario</th>
                    <th>email</th>                        
                    <th>cidade</th>
                    <th>situação</th>
                    <th>operation</th>
                    </tr>
                </thead>
                <this.ReturnLinhasAssistencia />
            </table>
        </div>
        )
    }
}