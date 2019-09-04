import React from 'react';
import axios from 'axios';
import './produto.css'

export default class showFotos extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            produtos : []
        }
    }
    
    componentDidMount() {
        axios.get(`http://localhost:3001/dev/foto/${this.props.id}`)
            .then(res => {
                const produtos = res.data;
                this.setState({ produtos });
            })
    }
    
  MostraFoto(props){
    const img = props.img  
    const caminho = "/uploads/produtos/" ; 
    const concat = caminho+img;
     console.log(concat)
    return <img className="imgLogo" src={concat}  alt="" />
   }

    render() {
        const fotos = this.state.produtos
        
        return (<div>
            
            {fotos.map((item) =>  <div className='foto' key={item.idFoto}><this.MostraFoto img={item.caminho} /></div>)}   
             
        </div>)
    }
}