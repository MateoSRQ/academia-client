import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { Drawer, Button, Space, Col, Row, Form, Checkbox, Select } from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import { Tabs, Radio } from 'antd';
import { Input } from 'antd';
import Scrollbar from 'react-custom-scrollbars'
import useDimensions from 'react-use-dimensions'
import { UserOutlined, LockOutlined, DownloadOutlined, SaveOutlined, CloseCircleOutlined, MoreOutlined, AuditOutlined, FileTextOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

const { Search } = Input;
const { TabPane } = Tabs;

const { Option } = Select;
const departamento = ['Amazonas', 'Ancash'];
const provincia = {
    Amazonas: ['Chachapoyas', 'Asuncion', 'Balsas'],
    Ancash: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};
type CityName = keyof typeof provincia;

function Component() {

    const [size, setSize] = useState<SizeType>('large');
    const onFinish = (values: any) => {
        // console.log('Received values of form: ', values);
    };
    const [cities, setCities] = useState(provincia[departamento[0] as CityName]);
    const [secondCity, setSecondCity] = useState(provincia[departamento[0] as CityName][0]);

    const handleProvinceChange = (value: CityName) => {
        setCities(provincia[value]);
        setSecondCity(provincia[value][0]);
    };

    const onSecondCityChange = (value: CityName) => {
        setSecondCity(value);
    };
    return (
        < div className={style.component} >
            {/* <div className={style.title}>Registro de <b>Sede</b></div>
            <span>Por favor de ingresar la información solicitada</span> */}
            <span >Por favor de ingresar la información solicitada.</span>
            <Scrollbar className={style.scroller} >
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    className={style.form}
                    layout="vertical"
                    autoComplete="off"
                    hideRequiredMark
                >
                    <Form.Item
                        name="cod_sede"
                        label="Código de Sede"
                        rules={[{ required: true, message: 'Por favor ingrese su código de sede!' }]}
                    >
                        <Input prefix={<FileTextOutlined className="site-form-item-icon" />} placeholder="Código de Sede" />
                    </Form.Item>
                    <Form.Item
                        name="nombre"
                        label="Nombre de Sede"
                        rules={[{ required: true, message: 'Por favor ingrese su nombre de Sede!' }]}
                    >
                        <Input prefix={<FileTextOutlined className="site-form-item-icon" />} placeholder="Nombre de Sede" />
                    </Form.Item>
                    <Form.Item label="Departamento">

                        <Select defaultValue={departamento[0]} onChange={handleProvinceChange}>
                            {departamento.map(province => (
                                <Option key={province}>{province}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Provincia">
                        <Select value={secondCity} onChange={onSecondCityChange}>
                            {cities.map(city => (
                                <Option key={city}>{city}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item label="Distrito">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="direccion"
                        label="Dirección"
                        rules={[{ required: true, message: 'Por favor ingrese su Dirección!' }]}
                    >
                        <Input prefix={<AuditOutlined className="site-form-item-icon" />} placeholder="Dirección" />
                    </Form.Item>
                    <Form.Item
                        name="latitud"
                        label="Latitud"
                        rules={[{ required: true, message: 'Por favor ingrese su Latitud!' }]}
                    >
                        <Input prefix={<AuditOutlined className="site-form-item-icon" />} placeholder="Latitud" />
                    </Form.Item>

                    <Form.Item label="Estado">
                        <Select >
                            <Select.Option value="1">Activo</Select.Option>
                            <Select.Option value="2">Inactivo</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button icon={<CloseCircleOutlined />}  >
                            Cancelar
                        </Button>
                        <Button icon={<SaveOutlined />} type="primary">
                            Registrar
                        </Button>
                    </Form.Item>
                </Form>

            </Scrollbar>
        </div >
    )
}

export default Component
