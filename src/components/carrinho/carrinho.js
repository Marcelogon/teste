import React from 'react'
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd'
import Cookies from 'js-cookie'
import axios from 'axios'
import CurrencyFormat from 'react-currency-format'
import ModalView from './orcamento'
import './carrinho.css'

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
export default class carrinho extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: [], visible: false, dataTeste: [],total: null, editingKey: '' };
        this.columns = [

            {
                title: 'id',
                dataIndex: 'idOrcamento',
                width: '5%',
                editable: false,
            },
            {
                title: 'Descrição',
                dataIndex: 'dsOrcamento',
                width: '40%',
                editable: true,
            },
            {
                title: 'Total',
                dataIndex: 'vlTotal',
                width: '15%',
                editable: false,
            },
            {
                title: 'situação',
                dataIndex: 'situacao',
                width: '15%',
                editable: true,
            },
            {
                title: 'data',
                dataIndex: 'dtOrcamento',
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
                                    <button className="buttonTest" disabled={editingKey !== ''} onClick={() => this.edit(record.idOrcamento)}>Editar</button>
                                )}
                            <button className="buttonTest" onClick={() => this.showModal(record.idOrcamento, record.vlTotal)}>Visualizar</button>

                        </div>
                    );
                },
            },
        ];
    }
    componentDidMount() {
        axios.get(`http://localhost:3001/dev/orcamento/${Cookies.get('userid')}`)
            .then(res => {

                const datadois = []
                const data = res.data;
                console.log(data)
                this.setState({ data });

                this.state.data.map((item) => <li key={item.idOrcamento} >{changeItem(item)}</li>)

                function changeItem(item) {
                    item.vlTotal = <CurrencyFormat value={item.vlTotal} displayType={'text'} decimalSeparator="," thousandSeparator="." prefix={'R$'} renderText={value => <span>{value}</span>} />


                    datadois.push(item)
                }
                this.setState({ data: datadois })
            });
    }

    isEditing = record => record.idProduto === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, idOrcamento) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => idOrcamento === item.idOrcamento);
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
    showModal(key, vlTotal) {
        Cookies.set('orcamentoid', key)
       
        this.setState({
            visible: true,
            total: vlTotal
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    edit(key) {
        console.log("ué = " + key);
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

        if(this.state.visible){
            return <ModalView />
        }    

        return (
            <div>                
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
