import {useState, useRef, useEffec, useLayoutEffect} from 'react'
import {Drawer, Button, Space, Col, Row} from 'antd';
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

const { Search } = Input;
const { TabPane } = Tabs;

function Component() {
    const ref = useRef<HTMLDivElement>()
    const [dimensions, setDimensions] = useState({x: 0, y: 0, top: 0, bottom: 0, left: 0, right: 0, height: 0, width: 0})

    useLayoutEffect(() => {
        if (ref && ref.current) {
            setDimensions(ref.current.getBoundingClientRect().toJSON())
        }
    }, [ref.current])

    console.log('dimensions')
    console.log(dimensions)

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
                                    <Breadcrumb.Item>Home</Breadcrumb.Item>
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
                    {/*<Scrollbar>*/}
                        <Scrollbar style={{height: dimensions.height  - 256 +  'px'}} >
                            <div style={{height: '10000px'}}>
                                Content of tab 1
                            </div>
                        </Scrollbar>
                    {/*</Scrollbar>*/}
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
