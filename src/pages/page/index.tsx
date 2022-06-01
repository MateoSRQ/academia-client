import {useState, useRef, useEffect, useLayoutEffect} from 'react'
import {Drawer, Button, Space, Col, Row, Pagination} from 'antd';
import {Tooltip} from 'antd';
import { Menu, Dropdown } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Breadcrumb} from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import { Tabs, Radio } from 'antd';
import { Input } from 'antd';
import Scrollbar from 'react-custom-scrollbars'
import useDimensions from 'react-use-dimensions'
import axios from 'axios'
import  Table from '../../components/table'
import New from './new'

import {useStore} from '../../store'
const { Search } = Input;
const { TabPane } = Tabs;

function Component() {
    const ref = useRef<HTMLDivElement>()
    const [dimensions, setDimensions] = useState({x: 0, y: 0, top: 0, bottom: 0, left: 0, right: 0, height: 0, width: 0})
    const [drawer1Visible, setDrawer1Visible] = useState(false)
    const [data, setData] = useState<any[]>([])
    const alumnos = useStore((state) => state.alumnos)
    const columns =
        [
            {
                title: 'ID',
                dataIndex: 'postulante.persona.id',
                width: 100,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '100px' }}>
                        {record.postulante.persona.id}
                    </div>
                ),

            },
            {
                title: 'Nombres',
                dataIndex: 'postulante.persona.nombres',
                width: 300,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.postulante.persona.nombres}
                    </div>
                ),
            },
            {
                title: 'Apellido Paterno',
                dataIndex: 'postulante.persona.apellidoPaterno',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.postulante.persona.apellidoPaterno}
                    </div>
                ),
            },
            {
                title: 'Apellido Materno',
                dataIndex: 'postulante.persona.apellidoMaterno',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.postulante.persona.apellidoMaterno}
                    </div>
                ),
            },

            {
                title: 'Correo 1',
                dataIndex: 'postulante.persona.correoElectronico_1',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '250px' }}>
                        {record.postulante.persona.correoElectronico_1}
                    </div>
                ),
            },
            {
                title: 'Correo 2',
                dataIndex: 'postulante.persona.correoElectronico_2',
                width: 350,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '250px' }}>
                        {record.postulante.persona.correoElectronico_2}
                    </div>
                ),
            },
            {
                title: 'Tipo Documento',
                dataIndex: 'postulante.persona.documentoTipo',
                width: 250,
                render: (text, record) => (
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                        {record.postulante.persona.documentoTipo}
                    </div>
                ),
            },
            {
            title: 'Tipo Documento',
            dataIndex: 'postulante.persona.documentoCodigo',
            width: 250,
            render: (text, record) => (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '150px' }}>
                    {record.postulante.persona.documentoCodigo}
                </div>
            ),
        },
        {
            title: 'Teléfono 01',
            dataIndex: 'postulante.persona.telefono_1',
            width: 350,
            render: (text, record) => (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '250px' }}>
                    {record.postulante.persona.telefono_1}
                </div>
            ),
        },
        {
            title: 'Teléfono 02',
            dataIndex: 'postulante.persona.telefono_2',
            width: 350,
            render: (text, record) => (
                <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: '250px' }}>
                    {record.postulante.persona.telefono_2}
                </div>
            ),
        },
        ]

    useEffect(() => {

        // console.log('xxxxxxx')
        // async function fetch() {
        //     let data01 = await axios.get('/assets/data.json')
        //     console.log('zzzzzzzz')
            let _data = alumnos.map((item: any) => {
                return {...item, key: item.id}
            })
            console.log(_data)
            setData(_data)
        // }
        // fetch()
        console.log('yyyyyyy')
        if (ref && ref.current) {
            setDimensions(ref.current.getBoundingClientRect().toJSON())
        }
    }, [])

    const handleClick = (button: number) => {
        switch (button) {
            case 1:
                setDrawer1Visible(true)
                break;
            default:
                break;
        }
    }

    const handleClose = (button: number) => {
        switch (button) {
            case 1:
                setDrawer1Visible(false)
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
                                    <Breadcrumb.Item >Home</Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">Application Center</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <a href="">Application List</a>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>An Application</Breadcrumb.Item>
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
                            Listado de Alumnos: <span>Facultad de Medicina</span>
                        </div>
                        <div className={style.header3}>Listado del número 501 al 599, activos únicamente</div>
                    </Col>
                    <Col span={8} style={{textAlign: 'right'}} >
                        <Search style={{width: '280px', marginTop: '12px'}} placeholder="input search text" enterButton="Buscar" size="large" loading />
                    </Col>
                </Row>
            </div>

            <Tabs className={style.tabs} >
                <TabPane tab="Tab 1" key="1" className={style.tab}>
                    <div>
                        <div style={{width: 'calc(100% - 150px)', position: 'relative'}}>
                            <Scrollbar style={{height: dimensions.height  - 256 +  'px', outline: '1px solid white'}} >
                                <div style={{height: '10000px', width: 'calc(100% - 20px)'}}>
                                    <Table
                                        data={data}
                                        columns={columns}
                                        pagination={{ pageSize: 100, pageSizeOptions: ['10', '50', '100']}}
                                    >

                                    </Table>
                                </div>
                            </Scrollbar>
                        </div>
                        <Space className={style.rightBar} style={{ display: 'flex' }} direction="vertical">
                            <Button block onClick={() => {handleClick(1)}}>Button 1</Button>
                            <Button block>Button 2</Button>
                            <Button block>Button 3</Button>
                            <Button block>Button 4</Button>

                        </Space>
                        <Drawer
                            visible={drawer1Visible}
                            // getContainer={false}
                            onClose={() => {handleClose(1)}}
                            style={{ position: 'absolute' }}
                            closable={false}
                        >
                            <New />
                        </Drawer>
                    </div>
                </TabPane>
                <TabPane tab="Tab 2" key="2" className={style.tab}>
                    Content of tab 2
                </TabPane>
                <TabPane tab="Tab 3" key="3" className={style.tab}>
                    Content of tab 3
                </TabPane>
            </Tabs>

        </div>
    )
}

export default Component
