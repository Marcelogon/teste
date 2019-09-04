import React from 'react';
import axios from 'axios';

import TabelaConsulta from './TabelaConsulta';




export default class ConsultaCategoria extends React.Component {
    state = {
        categorias: [],

    }


    componentDidMount() {
        axios.get(`http://localhost:3001/dev/categoria/`)
            .then(res => {
                const categorias = res.data;
                this.setState({ categorias });
            })
    }

    render() {    
       
        return (
            <div> 
                <TabelaConsulta />

            </div>
        )
    }
}