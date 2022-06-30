import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Drawer, Button, Space, Col, Row, Pagination, Tag } from 'antd';
import { Tooltip } from 'antd';
import { Menu, Dropdown } from 'antd';
import { CloseCircleOutlined, DeleteTwoTone, DownloadOutlined, EditTwoTone, FileSearchOutlined, FolderAddOutlined, FolderAddTwoTone, SaveOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import { Tabs, Radio } from 'antd';
import { Input } from 'antd';
import Scrollbar from 'react-custom-scrollbars'
import useDimensions from 'react-use-dimensions'
import axios from 'axios'
import Table from '../../components/table'
import New from './new'
import Swal from 'sweetalert2'
import { useStore } from '../../store'
import { SizeType } from 'antd/lib/config-provider/SizeContext';

const { Search } = Input;
const { TabPane } = Tabs;

function Component() {
    const ref = useRef<HTMLDivElement>()
    const [dimensions, setDimensions] = useState({ x: 0, y: 0, top: 0, bottom: 0, left: 0, right: 0, height: 0, width: 0 })
    const [drawer1Visible, setDrawer1Visible] = useState(false)
    const [dataTable, setDataTable] = useState<any[]>([])
    const [data, setData] = useState<any[]>([])
    const [size, setSize] = useState<SizeType>('large');

    // const alumnos = useStore((state) => state.alumnos)

    const columns =
        [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 100,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '100px' }}>
                        {record.id}
                    </div>
                ),

            },
            {
                title: 'Cod Sede',
                dataIndex: 'nombre',
                width: 300,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.nombre}
                    </div>
                ),
            },
            {
                title: 'Sede',
                dataIndex: 'telefono',
                width: 300,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.telefono}
                    </div>
                ),
            },
            {
                title: 'Ubigeo',
                dataIndex: 'direccion',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.direccion}
                    </div>
                ),
            },
            {
                title: 'Estado',
                dataIndex: 'estadoAuditoria',
                width: 350,
                render: (text, record) => (

                    // <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                    //     {record.estadoAuditoria}
                    // </div >


                    <>
                        {

                            <Tag color={'green'}>
                                {'Activo'}
                            </Tag>

                        }
                    </>

                ),
            },
            {
                title: 'Accion',
                dataIndex: '',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '200px' }}>
                        {/* <Button type="primary" shape="circle" style={{ marginRight: '10px' }}> <EditTwoTone style={{ fontSize: '26px', color: '#08c' }} /></Button> */}
                        {/* <Button type="primary" shape="circle" icon={<EditTwoTone style={{ fontSize: '26px', color: '#08c' }} />} size={size} />
                        <Button type="primary" shape="circle" icon={<DeleteTwoTone style={{ fontSize: '26px', color: '#08c' }} />} size={size} /> */}

                        <Tooltip title="Editar" style={{ marginRight: '10px' }} >
                            <Button onClick={() => { handleClick(1, record) }} type="default" shape="circle" icon={<EditTwoTone twoToneColor="#4241a5" style={{ fontSize: '26px' }} />} />
                        </Tooltip>
                        <Tooltip title="Eliminar" >
                            <Button onClick={() => { eliminar(record.id) }} type="default" shape="circle" icon={<DeleteTwoTone twoToneColor="#4241a5" style={{ fontSize: '26px' }} />} />
                        </Tooltip>

                    </div>
                ),
            },
        ]

    useEffect(() => {

        const readData = async () => {

            try {

                const response = await axios.get('https://prjboss.uap.edu.pe:8443/sisacademicopruebaback/api/v1/sede/paginado?pageNumber=0&pageSize=5&sortDirection=ASC&sortBy=nombre&estadoAuditoria=true')
                let _data = response.data.content.map((item: any) => {
                    return { ...item, key: item.id }
                })
                setData(_data)

            } catch (error) {
                alert(error);
            }

        }

        readData()

        if (ref && ref.current) {
            setDimensions(ref.current.getBoundingClientRect().toJSON())
        }
    }, [])

    const handleClick = (button: number, data: any) => {
        console.log(data)
        switch (button) {
            case 1:
                setDrawer1Visible(true)
                setDataTable(data)
                break;
            default:
                break;
        }
    }
    const eliminar = (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = (button: number, data: any) => {
        switch (button) {
            case 1:
                setDrawer1Visible(false)
                setDataTable(data)
                break;
            default:
                break;
        }
    }

    // @ts-ignore
    return (

        <div className={style.component} ref={ref}>
            <div
            // style={{outline: '1px solid blue'}}
            >

                <div className={style.header1}>
                    <Row>
                        <Col span={12}>
                            <div className={style.breadcrumb}>
                                <Breadcrumb>
                                    <Breadcrumb.Item >Inicio</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">Información General</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>Sede</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </Col>
                        <Col span={12}>
                            {/*<div className={style.username}>Bienvenido, Mateo!</div>*/}
                            <Button>Bienvenido, Mateo!</Button>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col span={16}>
                        <div className={style.header2}>
                            Listado de Sedes
                        </div>
                        <div className={style.header3}>Listado del número 501 al 599, activos únicamente</div>
                    </Col>
                    <Col span={8} style={{ textAlign: 'right' }} >
                        <Search style={{ width: '280px', marginTop: '12px' }} placeholder="Buscar" enterButton="Buscar" size="large" loading />
                    </Col>
                </Row>
            </div>

            <Tabs className={style.tabs} >
                <TabPane tab="Bandeja de información" key="1" className={style.tab}>
                    <div>
                        <div style={{ width: 'calc(100% - 150px)', position: 'relative' }}>
                            <Scrollbar style={{ height: dimensions.height - 256 + 'px', outline: '1px solid white' }} >
                                <div style={{ height: '10000px', width: 'calc(100% - 20px)' }}>
                                    <Table
                                        data={data}
                                        columns={columns}
                                        pagination={{ pageSize: 100, pageSizeOptions: ['10', '50', '100'] }}
                                    >
                                    </Table>
                                </div>
                            </Scrollbar>
                        </div>
                        <Space className={style.rightBar} style={{ display: 'flex' }} direction="vertical">
                            <Button block onClick={() => { handleClick(1, null) }}><FolderAddTwoTone twoToneColor="#4241a5" style={{ fontSize: '26px', color: '#08c' }} /></Button>
                        </Space>
                        <Drawer

                            title="Crear nueva sede"
                            width={450}
                            visible={drawer1Visible}
                            // getContainer={dataTable}
                            // getContainer={false} 

                            onClose={() => { handleClose(1, null) }}

                            style={{ position: 'absolute' }}
                            closable={false}


                            extra={
                                <Space>
                                    <Button icon={<CloseCircleOutlined />} onClick={() => { handleClose(1, null) }}>
                                        Cancelar
                                    </Button>
                                    <Button icon={<SaveOutlined />} type="primary">
                                        Registrar
                                    </Button>
                                </Space>
                            }
                        >
                            <New />
                        </Drawer>
                    </div>
                </TabPane>
                {/* <TabPane tab="Tab 2" key="2" className={style.tab}>
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3" className={style.tab}>
                    Content of tab 3
                </TabPane> */}
            </Tabs>

        </div>
    )
}

export default Component

