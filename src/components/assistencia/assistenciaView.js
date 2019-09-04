import React from 'react'
import './assistencia.css'
import {Link} from 'react-router-dom'
import axios from  'axios'
import Cookies from 'js-cookie'

export default class AssistenciaView extends React.Component{
    constructor(props){
        super(props)
        this.ChangeDisplay = this.ChangeDisplay.bind(this)
        this.onClickEnviar = this.onClickEnviar.bind(this)
    }
    state = {
        display : true,
        descricao : '',
        defeito: ''
    }

    onChangeDefeito = event =>{
        this.setState({defeito: event.target.value})
    }

    onChangeDescricao = event =>{
        this.setState({descricao: event.target.value})
    }


    ChangeDisplay(){
        this.setState({display : !this.state.display})
    }
    onClickEnviar(){
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post(`http://localhost:3001/dev/assistencia/`, {
            id: Cookies.get('userid'),
            descricao: this.state.descricao,
            defeito: this.state.defeito
        }, axiosConfig)
            .then(res => {
                
                axios.post(`http://localhost:3001/dev/historico/`, {
                    id: res.data.insertId,
                    descricao: 'Aguardando confirmação'
                }, axiosConfig)
                    .then(res => {
                        
                        console.log(res);
                        console.log(res.data);
                    })
            })
           
    }

    render(){
        if(this.state.display === false){
            return <div className='divAssis'>
                
                    <span>Descrição do Produto</span>
                    <input className='inputdesc' type='text' placeholder='Ex: Central de Portão PPA 4 trimpot' onChange={this.onChangeDescricao}/>
                    <span>Descrição do Defeito</span>
                    <input className='inputdesc' type='text' placeholder='Ex: Portão só abre para um lado' onChange={this.onChangeDefeito}/>
                    <button type='submit' onClick={this.onClickEnviar}>Enviar</button>
                    <Link to='/assistencias/lista/'><button >Lista de Assistencias</button></Link>    
                
            </div>
        }
        return(
            <div>
               <button className='button' onClick={this.ChangeDisplay}>Dar entrada Assistencia</button>
                <Link to='/assistencias/lista/'><button className='button'>Visualizar Assistencias</button></Link>
            </div>
        )
    }
}