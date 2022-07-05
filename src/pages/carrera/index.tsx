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
    Space,
    Card,
    Grid,
    Collapse,
} from "antd"
import style from "../facultad/index.module.css"
import "antd/dist/antd.css"
import Table from "../../components/table"
import {
    CheckSquareOutlined,
    CloseSquareOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusSquareOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons"
import { useFacultadStore } from "../../store/facultad"
import { useCarreraStore } from "../../store/carrera"
import { useNavigate } from "react-router"
import New from "../../pages/facultad/new"
import { useUsuarioStore } from "../../store/usuario"
import CollapsePanel from "antd/lib/collapse/CollapsePanel"
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
    const { eliminarFacultad, cargarLista } = useFacultadStore()
    const { carrera, responseTime, listarCarrera } = useCarreraStore()
    const { username } = useUsuarioStore()
    //const [form] = Form.useForm()

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
            title: "Carrera",
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
            title: "Facultad",
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
                    {record.facultad.nombre}
                </div>
            ),
        },
        
        {
            title: "Grado",
            width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "150px",
                    }}
                >
                    {record.cat_grado_estudio.descripcion}
                </div>
            ),
        },
        {
            title: "Modalidad",
            width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "150px",
                    }}
                >
                    {record.cat_modalidad.descripcion}
                </div>
            ),
        },
        {
            title: "Sede",
            width: 100,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "50px",
                        textAlign: "center",
                    }}
                >
                    {<UnorderedListOutlined onClick={() => setDrawerVisible(true)} />}
                </div>
            ),
        },
        {
            title: "Estado",
            width: 80,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "80px",
                    }}
                >
                    {record.activo ? (
                        <Tag color={"green"}>{"Activo"}</Tag>
                    ) : (
                        <Tag color={"red"}>{"Inactivo"}</Tag>
                    )}
                </div>
            ),
        },
        {
            title: "Acción",
            width: 50,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        width: "100px",
                    }}
                >
                    {
                        <div>
                            <Space direction="horizontal" size="small">
                                <EditOutlined
                                    className={style.tableIcon}
                                    onClick={() => handleEdit(record)}
                                />
                                <DeleteOutlined
                                    className={style.tableIcon}
                                    onClick={() => confirm(record.id)}
                                />
                                <CopyOutlined className={style.tableIcon} />
                            </Space>
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
                //form.resetFields()
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
                                    <Breadcrumb.Item>Carrera</Breadcrumb.Item>
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

    const SedesCard = () => {
        const _data = [
            {
                id: "001",
                sede: {
                    codigo: "SED-01",
                    nombre: "SEDE 01",
                },
                ubicacion: {
                    departamento: "Lima",
                    provincia: "Lima",
                    distrito: "Jesús María",
                },
                estado: true,
            },
            {
                id: "002",
                sede: {
                    codigo: "SED-02",
                    nombre: "SEDE 02",
                },
                ubicacion: {
                    departamento: "Arequipa",
                    provincia: "Camana",
                    distrito: "Camana",
                },
                estado: true,
            },
            {
                id: "003",
                sede: {
                    codigo: "SED-03",
                    nombre: "SEDE 03",
                },
                ubicacion: {
                    departamento: "Lambayaque",
                    provincia: "Chiclayo",
                    distrito: "Chiclayo",
                },
                estado: false,
            },
            {
                id: "004",
                sede: {
                    codigo: "SED-04",
                    nombre: "SEDE 04",
                },
                ubicacion: {
                    departamento: "Piura",
                    provincia: "Morropon",
                    distrito: "Morropon",
                },
                estado: true,
            },
            {
                id: "005",
                sede: {
                    codigo: "SED-05",
                    nombre: "SEDE 05",
                },
                ubicacion: {
                    departamento: "Cajamarca",
                    provincia: "Celendin",
                    distrito: "Celendin",
                },
                estado: false,
            },
            {
                id: "006",
                sede: {
                    codigo: "SED-06",
                    nombre: "SEDE 06",
                },
                ubicacion: {
                    departamento: "Ica",
                    provincia: "Ica",
                    distrito: "Ica",
                },
                estado: true,
            },
            {
                id: "007",
                sede: {
                    codigo: "SED-07",
                    nombre: "SEDE 07",
                },
                ubicacion: {
                    departamento: "Cusco",
                    provincia: "Cusco",
                    distrito: "Cusco",
                },
                estado: false,
            },
            {
                id: "008",
                sede: {
                    codigo: "SED-08",
                    nombre: "SEDE 08",
                },
                ubicacion: {
                    departamento: "Junin",
                    provincia: "Huancayo",
                    distrito: "Huancayo",
                },
                estado: false,
            },
        ]
        const [data, setData] = useState(_data)

        const handleClick = (id: string) => {
            setData((state) =>
                state.map((el) => {
                    if (el.id === id) {
                        return {
                            ...el,
                            estado: !el.estado,
                        }
                    }
                    return el
                })
            )
        }

        return (
            <div>
                <div>
                    <Card style={{ userSelect: "none" }} title="Agregar Sedes">
                        {data.map((el) => (
                            <Card
                                key={el.id}
                                size="small"
                                onClick={() => handleClick(el.id)}
                                //headStyle={{backgroundColor: 'rgba(255, 255, 255, 0.4)', border: 0 }}
                                hoverable
                                bordered
                                title={el.sede.codigo+" - "+el.sede.nombre}
                                extra={
                                    <Tag color={el.estado ? "green" : "red"}>
                                        {el.estado ? "Activo" : "Inactivo"}
                                    </Tag>
                                }
                                color="red"
                                style={{
                                    margin: "0.2em 0 0.9em 0",
                                    borderRadius: "0.2em",
                                    borderColor: el.estado ? "green" : "red",
                                    borderWidth: "1.3px",
                                }}
                            >
                                        <p>
                                        {el.ubicacion.departamento} <br/>
                                        {el.ubicacion.provincia} <br/>
                                        {el.ubicacion.distrito}
                                        </p>                                
                            </Card>
                        ))}
                    </Card>
                </div>
            </div>
        )
    }

    useEffect(() => {
        listarCarrera()
    }, [])

    // @ts-ignore
    return (
        <div className={style.component}>
            <div>
                <Topbar />
                <Row>
                    <Col span={24}>
                        <div className={style.header2}>Listado de Carreras</div>
                        <div className={style.header3}>
                            Listado de información : 01 al{" "}
                            {carrera.length > 9 ? carrera.length : "0" + carrera.length}
                        </div>
                    </Col>
                </Row>
            </div>

            <Tabs className={style.tabs}>
                <TabPane tab="Bandeja de información" key="1" className={style.tab}>
                    <div className={style.container}>
                        {!carrera.length ? (
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
                                            //onSearch={}
                                        />
                                    </Col>
                                    <PlusSquareOutlined
                                        onClick={() => handleClick(1)}
                                        className={style.addIcon}
                                    />
                                </div>
                                <div style={{ width: "calc(100% - 30px)" }}>
                                    <Table
                                        data={carrera}
                                        columns={columns}
                                        footer={tableFooter}
                                        pagination={{ pageSize: 4 }}
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
                        <SedesCard />
                    </Drawer>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Component
