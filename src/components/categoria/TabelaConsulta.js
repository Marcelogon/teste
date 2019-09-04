
import React from 'react';
import axios from 'axios';
import 'antd/dist/antd.css';
import './tabela.css';
import ListaSubCategoria from "./ListaSubCategoria"
import {
  Table, Input, InputNumber, Popconfirm, Form,
} from 'antd';

const data = [];



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

 export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data, editingidCategoria: '',idCat:'', mostraSub:0 };
    this.columns = [
      {
        title: 'Id',
        dataIndex: 'idCategoria',
        width: '25%',
        editable: false,
      },
      {
        title: 'Descrição',
        dataIndex: 'nome',
        width: '40%',
        editable: true,
      },
      
      {
        title: 'Operation',
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
                        onClick={() => this.save(form, record.idCategoria)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </button>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.idCategoria)}
                  >
                    <button>Cancel</button>
                  </Popconfirm>
                </span>
              ) : (
                  <button
                  onClick={() => this.edit(record.idCategoria)}>Editar</button>
                
              )}
              <button style={{ marginLeft: 8 }} onClick={() => this.chamaSub(record.idCategoria)}>Subcategorias</button>
            </div>
          );
        },
      },
    ];
  }
  componentDidMount() {
    axios.get(`http://localhost:3001/dev/categoria/`)
        .then(res => {
            const data = res.data;
            this.setState({ data });
        })
}


  isEditing = record => record.idCategoria === this.state.editingidCategoria;

  cancel = () => {
    this.setState({ editingidCategoria: '' });
  };

  save(form, idCategoria) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => idCategoria === item.idCategoria);
      if (index > -1) {
        const item = newData[index];
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.patch(`http://localhost:3001/dev/categoria/${idCategoria}`, {
        nome: row.nome
    }, axiosConfig)
        .then(res => {
            console.log(res);
            console.log(res.data);                
        })
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingidCategoria: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingidCategoria: '' });
      }
    });
  }

  edit(idCategoria) {
    this.setState({ editingidCategoria: idCategoria });
  }
  chamaSub(idCategoria){
   this.setState({idCat:idCategoria, mostraSub:1})
  }

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

  

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

    const retornaRender = () =>{
      if(this.state.mostraSub === 1){
      return <ListaSubCategoria idCat={this.state.idCat} />
      } else {
        return <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
      }
    }


  

    return (
      retornaRender()   );
  }
}


          