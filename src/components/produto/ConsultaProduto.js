
import React from 'react';
import './produto.css';
import ShowFotos from './showFotos'
import 'antd/dist/antd.css';
import {
  Table, Input, InputNumber, Popconfirm, Form, Button,
} from 'antd';
import axios from 'axios';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  
  
export default class ConstaProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], controle : 0, idProd:'', editingidProduto: '' };
    this.columns = [
      {
        title: 'id',
        dataIndex: 'idProduto',
        width: '5%',
        editable: false,
      },
      {
        title: 'nome',
        dataIndex: 'nome',
        width: '12%',
        editable: true,
      },
      {
        title: 'R$',
        dataIndex: 'valor',
        width: '3%',
        editable: true,
      },
      {
        title: 'descrição',
        dataIndex: 'descricao',
        width: '34%',
        editable: true,
      },
      {
        title: 'cod',
        dataIndex: 'cod',
        width: '5%',
        editable: true,
      },
      {
        title: 'marca',
        dataIndex: 'marca',
        width: '5%',
        editable: false,
      },
      {
        title: 'cat',
        dataIndex: 'categoria',
        width: '3%',
        editable: false,
      },
      {
        title: 'sub',
        dataIndex: 'sub',
        width: '5%',
        editable: false,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
        
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <button
                        onClick={() => this.save(form, record.idProduto)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.idProduto)}
                  >
                    <button>Cancel</button>
                  </Popconfirm>
                </span>
              ) : (
                  <Button icon="edit"
                  onClick={() => this.edit(record.idProduto)}></Button>
                
              )}
              <Button icon="picture" style={{ marginLeft: 8 }} onClick={() => this.chamaFotos(record.idProduto)}></Button>
              <Button icon="delete" style={{ marginLeft: 8 }} onClick={() => this.chamaDelete(record.idProduto)}></Button>
            </div>
          );
        },
      },
    ];
  }
  chamaFotos(props){
   this.setState({controle : 1, idProd : props })
  }
  chamaDelete(props){
    let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.delete(`http://localhost:3001/dev/produtos/${props}`, axiosConfig)
        .then(res => {
          console.log(res);
          console.log(res.data);
        })
    }
  componentDidMount(){
    axios.get(`http://localhost:3001/dev/produtos/`)
    .then(res => {
      const data = res.data;
      this.setState({ data });
    })
  }
  isEditing = record => record.idProduto === this.state.editingidProduto;

  cancel = () => {
    this.setState({ editingidProduto: '' });
  };

  save(form, idProduto) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => idProduto === item.idProduto);
      if (index > -1) {
        const item = newData[index];
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.patch(`http://localhost:3001/dev/categoria/${idProduto}`, {
        nome: row.nome,
        valor: row.valor,
        descricao: row.descricao,
        cod: row.cod
    }, axiosConfig)
        .then(res => {
            console.log(res);
            console.log(res.data);                
        })
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingidProduto: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingidProduto: '' });
      }
    });
  }

  edit(key) {
    this.setState({ editingidProduto: key });
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    if(this.state.controle === 1){
        return <ShowFotos id = {this.state.idProd} />
    }

    const columns = this.columns.map((col) => {
        if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

   
    return (
        
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

          