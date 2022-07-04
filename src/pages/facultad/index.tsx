import { useState, useEffect } from "react"
import {
    Drawer,
    Button,
    Breadcrumb,
    Col,
    Row,
    Form,
    Modal,
    Input,
    message,
    Tabs,
    Tag,    
    Spin,
} from "antd"
import style from "../facultad/index.module.css"
import "antd/dist/antd.css"
import Table from "../../components/table"
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusSquareOutlined,
} from "@ant-design/icons"
import { useFacultadStore } from "../../store/facultad"
import { useNavigate } from "react-router"
import New from "../../pages/facultad/new"
import { useUsuarioStore } from "../../store/usuario"
const { Search } = Input
const { TabPane } = Tabs

function Component() {
    const navigate = useNavigate()
    const [drawerVisible, setDrawerVisible] = useState(false)
    const initialState = {
        estado: false,
        datos: {
            id: 0,
            codigo: "",
            nombre: "",
            abreviatura: "",
        },
    }
    const [facultadEditada, setFacultadEditada] = useState(initialState)
    const { facultad, listaFiltrada, responseTime, listarFacultad, eliminarFacultad, filtrarFacultad, cargarLista } =
        useFacultadStore()
    const { username } = useUsuarioStore()
    const [ form ] = Form.useForm()  

    const handleEdit = (e: any) => {
        handleClick(2)
        setFacultadEditada((state) => ({ ...state, datos: e }))
    }

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
            width: 350,
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
                        <Tag color={"green"}>{"Activo"}</Tag>
                    ) : (
                        <Tag color={"red"}>{"Inactivo"}</Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Acción",
            width: 150,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "50px",
                        textAlign: "center",
                    }}
                >
                    {
                        <div>
                            <EditOutlined
                                className={style.tableIcon}
                                onClick={() => handleEdit(record)}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <DeleteOutlined
                                className={style.tableIcon}
                                onClick={() => confirm(record.id)}
                            />
                        </div>
                    }
                </div>
            ),
        },
    ]

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
                form.resetFields()
                //setFacultadEditada(initialState)
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
                    cargarLista()
                    message.success(mensaje)
                } else {
                    message.error(mensaje)
                }
            },
        })
    }

    const Topbar = () => {
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
                    {`${dias[fechaActual.getDay()]} ${fechaActual.getDate()} de ${
                        meses[fechaActual.getMonth()]
                    } del ${fechaActual.getFullYear()}`}
                </h5>
            )
        }
        return (
            <>
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
                                Bienvenido, {username}!
                            </Button>
                        </Col>
                    </Row>
                </div>
                <div className={style.date}>
                    <Fecha />
                </div>
            </>
        )
    }

    const tableFooter = () => {
        const date = new Date()
        const hours = date.getHours() > 12 ? date.getHours() % 12 : date.getHours()
        const minutes = date.getMinutes()
        const period = date.getHours() > 12 ? "PM" : "AM"
        const time = `${hours < 9 ? "0" + hours : hours}:${
            minutes < 9 ? "0" + minutes : minutes
        } ${period} `
        return (
            <h5 style={{ textAlign: "right" }}>
                {`${time} - ${responseTime} seg. en respuesta`}
            </h5>
        )
    }

    const handleSearch = (e: string) => {        
        if (e === "") {
            cargarLista()
        } else {
            filtrarFacultad(e)
        }
    }

    useEffect(() => {
        listarFacultad()
    }, [])

    // @ts-ignore
    return (
        <div className={style.component}>
            <div>
                <Topbar />
                <Row>
                    <Col span={24}>
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

            <Tabs className={style.tabs}>
                <TabPane tab="Bandeja de información" key="1" className={style.tab}>
                    <div className={style.container}>
                        {!facultad.length ? (
                            <div className={style.loading}>
                                <Spin size="large" tip="Cargando..." />
                            </div>
                        ) : (
                            <>
                                <div className={style.childContainer}>
                                    <Col>
                                        <Search
                                            placeholder="buscar..."
                                            enterButton="Buscar"
                                            size="middle"
                                            allowClear
                                            onSearch={handleSearch}
                                        />
                                    </Col>
                                    <PlusSquareOutlined
                                        onClick={() => handleClick(1)}
                                        className={style.addIcon}
                                    />
                                </div>
                                <div style={{ width: "calc(100% - 30px)" }}>
                                    <Table
                                        data={listaFiltrada}
                                        columns={columns}
                                        footer={tableFooter}
                                        pagination={{ pageSize: 4}}
                                    ></Table>
                                    
                                </div>
                            </>
                        )}
                    </div>
                    
                    <Drawer
                        visible={drawerVisible}
                        onClose={() => handleClose(1)}
                        closable={false}
                    >
                        <New
                            facultadEditada={facultadEditada}
                            handleClose={handleClose}
                            form={form}
                        />
                    </Drawer>
                </TabPane>
            </Tabs>
            
        </div>
    )
}

export default Component
