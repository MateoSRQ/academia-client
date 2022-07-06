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
    Badge,
} from "antd"
import style from "../carrera/index.module.css"
import "antd/dist/antd.css"
import Table from "../../components/table"
import {
    AppstoreAddOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
    PlusOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons"
import { useFacultadStore } from "../../store/facultad"
import { useCarreraStore } from "../../store/carrera"
import { useNavigate } from "react-router"
import New from "../../pages/carrera/new"
import { useUsuarioStore } from "../../store/usuario"
const { Search } = Input
const { TabPane } = Tabs
import { useCatalogoStore } from "../../store/catalogo"

const _data = [
    {
        id: "001",
        sede: {
            codigo: "SED-01",
            nombre: "SEDE LIMA",
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
            nombre: "SEDE AREQUIPA",
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
            nombre: "SEDE LAMBAYAQUE",
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
            nombre: "SEDE PIURA",
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
            nombre: "SEDE CAJAMARCA",
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
            nombre: "SEDE ICA",
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
            nombre: "SEDE CUSCO",
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
            nombre: "SEDE JUNIN",
        },
        ubicacion: {
            departamento: "Junin",
            provincia: "Huancayo",
            distrito: "Huancayo",
        },
        estado: false,
    },
]

const dummyData = [
    {
        id: 5,
        codigo: "ca-02",
        nombre: "carrera 02",
        idFacultad: 1,
        idGradoEstudio: 4,
        idModalidad: 2,
        estadoAuditoria: true,
        activo: true,
        sedes: [
            { codigo: "SED-01", nombre: "SEDE LIMA" },
            { codigo: "SED-02", nombre: "SEDE AREQUIPA" },
            { codigo: "SED-03", nombre: "SEDE LAMBAYEQUE" },
            { codigo: "SED-04", nombre: "SEDE LIPIURAA" },
            { codigo: "SED-05", nombre: "SEDE CAJAMARCA" },
        ],
        facultad: {
            id: 1,
            codigo: "string",
            nombre: "string",
            abreviatura: "string",
            estadoAuditoria: false,
            activo: false,
        },
        cat_modalidad: {
            id: 2,
            descripcion: "SEMI-PRESENCIAL",
            idCatalogoTipo: 1,
            estadoAuditoria: false,
        },
        cat_grado_estudio: {
            id: 4,
            descripcion: "modalidad 1",
            idCatalogoTipo: 2,
            estadoAuditoria: false,
        },
    },
]

function Component() {
    const columns = [
        {
            title: "ID",
            //width: 100,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "100px",
                    }}
                >
                    {record.id}
                </div>
            ),
        },

        {
            title: "Código",
            //width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "100px",
                    }}
                >
                    {record.codigo}
                </div>
            ),
        },
        {
            title: "Carrera",
            //width: 350,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "250px",
                    }}
                >
                    {record.nombre}
                </div>
            ),
        },
        {
            title: "Facultad",
            //width: 300,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "150px",
                    }}
                >
                    {record.facultad.nombre}
                </div>
            ),
        },

        {
            title: "Grado",
            //width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "150px",
                    }}
                >
                    {record.cat_grado_estudio.descripcion}
                </div>
            ),
        },
        {
            title: "Modalidad",
            //width: 200,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "150px",
                    }}
                >
                    {record.cat_modalidad.descripcion}
                </div>
            ),
        },
        {
            title: "Sede",
            //width: 100,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "50px",
                        //textAlign: "center",
                    }}
                >
                    {
                        <div>
                            <Badge
                                count={record.sedes.length}
                                size="small"
                                style={{ backgroundColor: "#52c41a" }}
                            />
                            &nbsp;&nbsp;
                            <UnorderedListOutlined onClick={() => showDrawer(1)} />
                        </div>
                    }
                </div>
            ),
        },
        {
            title: "Estado",
            //width: 80,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "80px",
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
            //width: 50,
            render: (_, record) => (
                <div
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        //width: "100px",
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

    const navigate = useNavigate()
    const initialState = {
        estado: false,
        datos: {
            id: 0,
            codigo: "",
            nombre: "",
            facultad: "",
            grado: "",
            modalidad: "",
            activo: "",
        },
    }
    const [carreraEditada, setCarreraEditada] = useState(initialState)
    const { cargarLista } = useFacultadStore()
    const { carrera, responseTime, listarCarrera, eliminarCarrera } = useCarreraStore()
    const { listarCatalogo } = useCatalogoStore()
    const { username } = useUsuarioStore()

    const handleEdit = (e: any) => {
        //handleClick(2) abre drawer para mostrar modo edicion
        //setFacultadEditada((state) => ({ ...state, datos: e }))
    }

    const confirm = (id: number) => {
        Modal.confirm({
            title: "Eliminar información",
            icon: <ExclamationCircleOutlined />,
            content: "¿Desea eliminar esta información?",
            okText: "Aceptar",
            cancelText: "Cerrar",
            onOk: async () => {
                const response = await eliminarCarrera(id)
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
            <h5
                style={{ textAlign: "right" }}
            >{`${time} - ${responseTime} seg. en respuesta`}</h5>
        )
    }

    const [drawerControl, setDrawerControl] = useState({
        sede: false,
        carrera: {
            parent: false,
            children: false,
        },
    })

    const showDrawer = (button: number) => {
        switch (button) {
            case 1:
                setDrawerControl((d) => ({ ...d, sede: true }))
                break
            case 2:
                setDrawerControl((d) => ({
                    ...d,
                    carrera: {
                        ...d.carrera,
                        parent: true
                        
                    },
                }))
                break
            default:
                setDrawerControl((d) => ({
                    ...d,
                    carrera: {
                        ...d.carrera,
                        children: true
                    },
                }))
                break
        }
    }

    const closeDrawer = (button: number) => {
        switch (button) {
            case 1:
                setDrawerControl((d) => ({ ...d, sede: false }))
                break
            case 2:
                setDrawerControl((d) => ({
                    ...d,
                    carrera: {
                        ...d.carrera,
                        parent: false
                    },
                }))
                break
            default:
                setDrawerControl((d) => ({
                    ...d,
                    carrera: {
                        ...d.carrera,
                        children: false
                    },
                }))
                break
        }
    }

    const SedesCard = (props: any) => {
        const [data, setData] = useState(_data)
        const [filterData, setFilterData] = useState(data)

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
            setFilterData((state) =>
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

        const handleSearch = (e: any) => {
            //console.log(e)
            if (e === "") {
                setFilterData(data)
            } else {
                const arr = filterData.filter((el) => el.sede.nombre.includes(e))
                if (arr.length > 0) {
                    setFilterData(filterData.filter((el) => el.sede.nombre.includes(e)))
                } else {
                    message.warning("No hubo coincidencia en la búsqueda")
                }
            }
        }

        return (
            <div>
                <div>
                    {" "}
                    <Search style={{ width: 262 }} onSearch={handleSearch} allowClear />
                </div>
                <br></br>
                {filterData.map((el) => (
                    <Card
                        key={el.id}
                        size="small"
                        onClick={() => (props.edicion ? handleClick(el.id) : null)}
                        hoverable
                        bordered
                        title={el.sede.nombre}
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
                            width: "260px",
                            userSelect: "none",
                        }}
                    >
                        <p style={{ lineHeight: "0.5" }}>
                            Departamento : <em> {el.ubicacion.departamento} </em>
                        </p>
                        <p style={{ lineHeight: "0.5" }}>
                            Provincia : <em> {el.ubicacion.provincia}</em>
                        </p>
                        <p style={{ lineHeight: "0.5" }}>
                            Distrito : <em> {el.ubicacion.distrito}</em>
                        </p>
                    </Card>
                ))}
            </div>
        )
    }

    useEffect(() => {
        listarCarrera()
        listarCatalogo()
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
                                    {/*
                                    <Col>
                                        <Search
                                            className={style.btn1}
                                            placeholder="buscar..."
                                            enterButton="Buscar"
                                            size="middle"
                                            allowClear
                                        />
                                    </Col>
                        */}
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => showDrawer(2)}
                                        className={style.btn}
                                    >
                                        Nuevo
                                    </Button>
                                </div>
                                <div style={{ width: "calc(100% - 30px)" }}>
                                    <Table
                                        data={dummyData}
                                        columns={columns}
                                        footer={tableFooter}
                                        pagination={{ pageSize: 6 }}
                                    ></Table>
                                </div>
                            </>
                        )}
                    </div>

                    <Drawer
                        width={340}
                        closable={false}
                        onClose={()=>closeDrawer(2)}
                        visible={drawerControl.carrera.parent}
                    >
                        <New showDrawer={showDrawer}/>
                        <Drawer
                            width={320}
                            closable={false}
                            onClose={()=>closeDrawer(3)}
                            visible={drawerControl.carrera.children}
                        >
                            <SedesCard edicion={true} />
                        </Drawer>
                    </Drawer>

                    <Drawer
                        width={320}
                        closable={false}
                        onClose={()=>closeDrawer(1)}
                        visible={drawerControl.sede}
                    >
                        <SedesCard edicion={true} />
                    </Drawer>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Component
