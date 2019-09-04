import React from 'react'
import './produto.css'
import axios from 'axios'
import CurrencyFormat from 'react-currency-format';
import {Link} from 'react-router-dom'

export default class detalheProduto extends React.Component {
constructor(props){
    super(props)
    this.renderButtons = this.renderButtons.bind(this)
    this.handleChangeMais = this.handleChangeMais.bind(this)
    this.handleChangeMenos = this.handleChangeMenos.bind(this)
}
    state = {
    fotos: [],
    produtos:[],
    valorFoto: 0,
}

handleChangeMais(){
const y = this.state.valorFoto
const x = y + 1
this.setState({valorFoto : x})
}
handleChangeMenos(){
    const y = this.state.valorFoto
    const x = y - 1
    this.setState({valorFoto : x})
}

renderButtons(props){
    
    const y = props.size -1 
  
    if(this.state.valorFoto === 0){
        return <div className="divButtons"><button className="disabled"  onClick={this.handleChangeMenos}>Anterior</button><button className="btn" onClick={this.handleChangeMais}>Próxima</button></div>
    }
    if(y === this.state.valorFoto){
       return <div className="divButtons"><button className="btn" onClick={this.handleChangeMenos}>Anterior</button><button className="disabled"  onClick={this.handleChangeMais}>Próxima</button></div>
    }
    
    return <div className="divButtons"><button className="btn" onClick={this.handleChangeMenos}>Anterior</button><button className="btn" onClick={this.handleChangeMais}>Próxima</button></div> 
}

componentWillMount(){
    const {handle} = this.props.match.params

    axios.get(`http://localhost:3001/dev/produtos/id/${handle}`)
            .then(res => {
                console.log("passou aqui ! seu troxa")
                const produtos = res.data;
                this.setState({ produtos });
                axios.get(`http://localhost:3001/dev/foto/${handle}`)
            .then(res => {
                const fotos = res.data;
                this.setState({ fotos });
            })
            })

    
}
    render() {
        const x = this.state.fotos.map((item) => item.caminho)
        console.log(this.state.produtos[0])
        return (

            <div className="divTotal">
            {this.state.produtos.map((produto) =>
                <div key={produto.idProduto}><Link to="/produtos"><button className="btnVoltar">Voltar</button></Link>
                <div className="divDesc">
                <table>
                <tbody className="tableDesc">
                        <tr>
                            <th>Nome: </th>
                            <td>{produto.nome}</td>
                            
                        </tr>
                        <tr>
                            <th>Valor: </th>
                            <td><strong><CurrencyFormat value={produto.valor}  displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <div>{value}</div>} /></strong></td>
                            
                        </tr>
                        <tr>
                            <th>Descrição: </th>
                            <td>{produto.descricao}</td>
                        </tr>
                        <tr>
                            <th>Marca: </th>
                            <td>{produto.marca}</td>
                        </tr>
                        <tr>
                            <th>Categoria: </th>
                            <td>{produto.categoria}</td>
                        </tr>
                        <tr>
                            <th>Subcategoria:  </th>
                            <td>{produto.sub}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className="divFotos">
                <img alt="" style={{maxWidth:290}} src={"/uploads/produtos/"+x[this.state.valorFoto]} />
                <this.renderButtons size = {x.length} />
            </div></div>
                )}
            </div>
        )
    }
}