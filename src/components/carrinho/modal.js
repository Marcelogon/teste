import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form, Modal } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import CurrencyFormat from 'react-currency-format'

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
export default class ModalView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], visible: false, dataTeste: [], editingKey: '' };
        this.columns = [
            
            {
                title: 'id',
                dataIndex: 'idProduto',
                width: '5%',
                editable: false,
            },
            {
                title: 'Produto',
                dataIndex: 'nomeProduto',
                width: '40%',
                editable: false,
            },
            {
                title: 'R$ unitario',
                dataIndex: 'valor',
                width: '15%',
                editable: false,
            },
            {
                title: 'qt',
                dataIndex: 'qtProduto',
                width: '5%',
                editable: true,
            },
            {
                title: ' total',
                dataIndex: 'qtxValor',
                width: '15%',
                editable: false,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                                    <EditableContext.Consumer>
                                        {form => (
                                            <button
                                                
                                                onClick={() => this.save(form, record.idOrcamento)}
                                                style={{ marginRight: 8 }}
                                            >
                                                Salvar
                          </button>
                                        )}
                                    </EditableContext.Consumer>
                                    <Popconfirm
                                        title="Sure to cancel?"
                                        onConfirm={() => this.cancel(record.idOrcamento)}
                                    >
                                        <button>Cancelar</button>
                                    </Popconfirm>
                                </span>
                            ) : (
                                    <button disabled={editingKey !== ''} onClick={() => this.edit(record.idOrcamento)}>Editar</button>
                                )}
                                
                        </div>
                    );
                },
            },
        ];
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/dev/orcamentop/${Cookies.get('orcamentoid')}`)
        .then(res => {
        
        const data = res.data;       
        console.log(data)
        this.setState({ data });
    });
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        console.log("ué = "+key);
        this.setState({ editingKey: key });
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
    
       
        return (
            <div>
         <Modal
          title="Orçamento"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        
        </Modal>
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
          </div>
        );
      }
    }
    