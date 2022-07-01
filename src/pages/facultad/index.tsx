import { useState, useRef, useEffect } from "react"
import {
    Drawer,
    Button,
    Breadcrumb,
    Col,
    Row,
    //Pagination,
    Form,
    Modal,
    Radio,
    Input,
    message,
} from "antd"
import style from "../facultad/index.module.css"
import "antd/dist/antd.css"
import Table from "../../components/table"
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    FileTextOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons"

import { useFacultadStore } from "../../store"
import { useNavigate } from "react-router"
const { Search } = Input

function Component() {
    const ref = useRef<HTMLDivElement>()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const [responseTime, setResponseTime] = useState(0)
    const [facultadEditada, setFacultadEditada] = useState({
        estado: false,
        datos: {
            id: 0,
            codigo: "",
            nombre: "",
            abreviatura: "",
        },
    })
    const {
        facultad,
        listarFacultad,
        guardarFacultad,
        actualizarFacultad,
        eliminarFacultad,
    } = useFacultadStore()

    const handleEdit = (e: any) => {
        handleClick(2)
        setFacultadEditada((state) => ({ ...state, datos: e }))
    }
    let navigate = useNavigate()

    const columns = [
        {
            title: "ID",
            //key:"id",
            width: 100,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "100px",
                    }}
                >
                    {record.id}
                </div>
            ),
        },
        {
            title: "Código",
            //key:"codigo",
            width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "100px",
                    }}
                >
                    {record.codigo}
                </div>
            ),
        },
        {
            title: "Facultad",
            //key:"nombre",
            width: 300,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "250px",
                    }}
                >
                    {record.nombre}
                </div>
            ),
        },
        {
            title: "Abreviatura",
            //key:"abreviatura",
            width: 300,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "150px",
                    }}
                >
                    {record.abreviatura}
                </div>
            ),
        },       
        {
            title: "Estado",          
            width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "150px",
                    }}
                >
                    {record.estadoAuditoria ? (
                        <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                        <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                </div>
            ),
        },       
        {
            title: "Acción",
            width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "50px",
                    }}
                >
                    {
                        <div>
                            <EditOutlined
                                style={{ fontSize: "17px", color: "#70b4fc" }}
                                onClick={() => handleEdit(record)}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <DeleteOutlined
                                style={{ fontSize: "17px", color: "#70b4fc" }}
                                onClick={() => confirm(record.id)}
                            />
                        </div>
                    }
                </div>
            ),
        },
    ]

    useEffect(async () => {
        const response = await listarFacultad()
        setResponseTime(response.responseTime)
    }, [])

    const handleClick = (button: number) => {
        setDrawerVisible(true)
        switch (button) {
            case 1:
                setFacultadEditada((state) => ({ ...state, estado: false }))
                break
            case 2:
                setFacultadEditada((state) => ({ ...state, estado: true }))
                break
            default:
                break
        }
    }

    const handleClose = (button: number) => {
        switch (button) {
            case 1:
                setDrawerVisible(false)
                break
            default:
                break
        }
    }

    const confirm = (id: number) => {
        Modal.confirm({
            title: "Eliminar información",
            icon: <ExclamationCircleOutlined />,
            content: "¿Desea eliminar esta información?",
            okText: "Aceptar",
            cancelText: "Cerrar",
            onOk: async () => {
                const response = await eliminarFacultad(id)
                const { resultado, mensaje } = response.data
                if (resultado === 1) {
                    success(mensaje)
                } else {
                    message.error(mensaje)
                }
            },
        })
    }

    const success = (mensaje: string) => {
        message.success(mensaje)
    }

    const FacultadForm = (props: any) => {
        const {
            facultadEditada: { estado, datos },
        } = props
        const [form] = Form.useForm()
        useEffect(() => {
            estado && form.setFieldsValue(datos)
        }, [])

        const handleFinish = async (e: any) => {
            if (estado) {
                const response = await actualizarFacultad(e)
                const { resultado, mensaje } = response.data
                if (resultado === 1) {
                    success(mensaje)
                } else {
                    message.error(mensaje)
                }
            } else {
                const response = await guardarFacultad(e)
                const { resultado, mensaje } = response.data
                if (resultado === 1) {
                    success(mensaje)
                } else {
                    message.error(mensaje)
                }
            }
            setDrawerVisible(false)
        }
        return (
            <div>
                <div>
                    <h3>{estado ? "Edición" : "Registro"} de Facultad</h3>
                    <hr />
                    <p>Favor de ingresar la información solicitada</p>
                </div>
                <Form                    
                    layout="vertical"
                    onFinish={handleFinish}
                    form={form}
                >
                    <Form.Item label="Id" name="id" hidden>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Código"
                        name="codigo"
                        rules={[{ required: true, message: "Debe ingresar un código" }]}
                    >
                        <Input prefix={<FileTextOutlined style={{ marginRight : '0.5em'}} />} />
                    </Form.Item>

                    <Form.Item
                        label="Nombre de Facultad"
                        name="nombre"
                        rules={[{ required: true, message: "Debe ingresar un nombre" }]}
                    >
                        <Input prefix={<FileTextOutlined style={{ marginRight : '0.5em'}} />}  />
                    </Form.Item>

                    <Form.Item
                        label="Abreviatura"
                        name="abreviatura"
                        rules={[
                            { required: true, message: "Debe ingresar una abreviatura" },
                        ]}
                    >
                        <Input prefix={<FileTextOutlined style={{ marginRight : '0.5em'}} />}  />
                    </Form.Item>
                    {/* Probar con radio y combo al mismo tiempo
                    <Form.Item
                        label="Estado"
                        name="estado"
                        rules={[{ required: true, message: "Debe escoger el estado" }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Activo</Radio>
                            <Radio value={0}>Inactivo</Radio>
                        </Radio.Group>
                    </Form.Item>
                    */}
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit" block>
                            {estado ? "Actualizar" : "Registrar"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }

    const Fecha = () => {
        const fechaActual = new Date()
        const dias = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sábado",
        ]
        const meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Setiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ]
        return (
            <h5>
                {dias[fechaActual.getDay()] +
                    " " +
                    fechaActual.getDate() +
                    " de " +
                    meses[fechaActual.getMonth()] +
                    " del " +
                    fechaActual.getFullYear()}
            </h5>
        )
    }

    // @ts-ignore
    return (
        <div className={style.component} ref={ref}>
            <div>
                <div className={style.header1}>
                    <Row>
                        <Col span={12}>
                            <div className={style.breadcrumb}>
                                <Breadcrumb>
                                    <Breadcrumb.Item>Inicio</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">Información General</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Facultad</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                        <Col span={12}>
                            {/*<div className={style.username}>Bienvenido, Mateo!</div>*/}
                            <Button
                                onClick={() => navigate("../login", { replace: true })}
                            >
                                Bienvenido, usuario!
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col span={24}>
                        <div
                            style={{
                                textAlign: "right",
                                marginRight: "0.5em",
                                marginTop: "0.4m",
                            }}
                        >
                            <Fecha />
                        </div>
                        <div className={style.header2}>Listado de Facultades</div>
                        <div className={style.header3}>
                            Listado de información : 01 al{" "}
                            {facultad.length > 9
                                ? facultad.length
                                : "0" + facultad.length}
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                <div className={style.container}>
                    <div
                        className={style.containerChild}
                        //style={{ outline: "1px solid red" }}
                    >
                        <Col>
                            <Search
                                placeholder="input search text..."
                                enterButton="Buscar"
                                size="middle"
                                //onChange={handleChange}
                            />
                        </Col>
                        <PlusSquareOutlined
                            onClick={() => handleClick(1)}
                            className={style.addIcon}
                        />
                    </div>
                    <div style={{ width: "calc(100% - 30px)" }}>
                        <Table
                            data={facultad}
                            columns={columns}
                            //pagination={{ pageSize: 100, pageSizeOptions: ['10', '50', '100']}}
                        ></Table>
                        <h5 style={{textAlign : 'right'}}>{ responseTime } seg. en respuesta</h5>
                    </div>
                </div>
                <Drawer
                    visible={drawerVisible}
                    // getContainer={false}
                    onClose={() => handleClose(1)}
                    closable={false}
                >
                    <FacultadForm facultadEditada={facultadEditada} />
                </Drawer>
            </div>
        </div>
    )
}

export default Component
