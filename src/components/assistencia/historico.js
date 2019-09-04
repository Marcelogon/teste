import React from 'react'
import axios from 'axios'
import '../carrinho/carrinho.css'
import Moment from 'react-moment'

export default class Assistencia extends React.Component{
    constructor(props){
        super(props)
        

        this.ReturnLinhas = this.ReturnLinhas.bind(this)
    }

    state = {
        historicos: [],
        assistencias : [],
        visible: false
    }

    componentDidMount(){
        const {handle} = this.props.match.params
        axios.get(`http://localhost:3001/dev/historico/${handle}`)
            .then(res => {
                const historicos = res.data;
                this.setState({ historicos });
                console.log(historicos[0])
            })
    }
        
    
    
    ReturnLinhas(){
        return this.state.historicos.map((item, index) => 
        <tbody key={item.idHistorico}>
        <tr>
        <td>{index+1}</td>
        <td>{item.descricaoHist}</td>
        <td>
            <Moment format="YYYY/MM/DD HH:mm">{item.dtCadastro}</Moment>
            </td>
        </tr>
        </tbody>)
    }

    render(){
        return(
            <div>
                <div>
                <table className="TableHistorico">
                    <thead>
                        <tr>
                        <th>Id</th>
                        <th>Descricao</th>
                        <th>Data</th>
                        </tr>
                    </thead>
                    <this.ReturnLinhas />
                </table>
            </div>
            </div>
        )
    }
}