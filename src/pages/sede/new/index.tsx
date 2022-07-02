import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Button, Form, Select, message } from "antd";
import style from "./index.module.css";
import "antd/dist/antd.css";
import { Tabs, Radio } from "antd";
import { Input } from "antd";
import Scrollbar from "react-custom-scrollbars";
import useDimensions from "react-use-dimensions";
import {
  UserOutlined,
  LockOutlined,
  DownloadOutlined,
  SaveOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  AuditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { useSedeStore, locationStore } from "../../../store/sede";
import axios from "axios";
const { Search } = Input;
const { TabPane } = Tabs;

const { Option } = Select;
const departamento = ["1", "2"];
const provincia = {
  1: ["11", "11", "11"],
  2: ["22", "22", "22"],
};
type CityName = keyof typeof provincia;

const New = (props: { setDrawerVisible: any }) => {
  const [size, setSize] = useState<SizeType>("large");
  const { departamentos, provincias, distritos } = locationStore();
  const { listarDeparment, listarProvincias, listarDistritos } =
    locationStore();
  const { setDrawerVisible } = props;
  const [deparment, setDeparment] = useState(0);
  const [distrito, setDistrito] = useState(0);
  const [sedeEditada, setSedeEditada] = useState({
    datos: {
      id: 0,
      codigo: "",
      nombre: "",
      tipo: 0,
      idUbigeo: 0,
      telefono: "",
      direccion: "",
      latitud: "",
      longitud: "",
      correo: "",
      estadoAuditoria: true,
    },
  });

  const { sede, guardarSede, actualizarSede } = useSedeStore();
  const [form] = Form.useForm();

  useEffect(() => {
    listarDeparment();
  }, []);

  const [cities, setCities] = useState(provincia[departamento[0] as CityName]);
  const [secondCity, setSecondCity] = useState(
    provincia[departamento[0] as CityName][0]
  );

  const changeDepartament = (value: number) => {
    listarProvincias(value);
    setDeparment(value);
  };

  const changeProvincia = (value: number) => {
    listarDistritos(deparment, value);
  };

  const changeDistrito = (value: number) => {
    setDistrito(value);
  };

  const onSave = async (values: any) => {
    const dataSave = {
      id: 0,
      codigo: values.codigo,
      nombre: values.nombre,
      tipo: 4,
      idUbigeo: distrito,
      telefono: "",
      direccion: values.direccion,
      latitud: values.latitud,
      longitud: values.longitud,
      correo: "",
      estadoAuditoria: values.estadoAuditoria,
    };
    try {
      const response = await guardarSede(dataSave);
      const { resultado, mensaje } = response;
      if (resultado === 1) {
        message.success(mensaje);
        setDrawerVisible(false);
        form.resetFields();
      } else {
        message.error(mensaje);
      }
    } catch (error) {
      message.error("Ocurrió un error, por favor intente nuevamente");
    }
  };

  return (
    <div className={style.component}>
      {/* <div className={style.title}>Registro de <b>Sede</b></div>
            <span>Por favor de ingresar la información solicitada</span> */}
      <span>Por favor de ingresar la información solicitada.</span>
      <Scrollbar className={style.scroller}>
        <Form
          // name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onSave}
          form={form}
          className={style.form}
          layout="vertical"
          autoComplete="off"
          hideRequiredMark
        >
          <Form.Item
            name="codigo"
            label="Código de Sede"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su código de sede",
              },
            ]}
          >
            <Input
              prefix={<FileTextOutlined className="site-form-item-icon" />}
              placeholder="Código de Sede"
            />
          </Form.Item>
          <Form.Item
            name="nombre"
            label="Nombre de Sede"
            rules={[
              {
                required: true,
                message: "Por favor ingrese su nombre de Sede",
              },
            ]}
          >
            <Input
              prefix={<FileTextOutlined className="site-form-item-icon" />}
              placeholder="Nombre de Sede"
            />
          </Form.Item>
          <Form.Item label="Departamento">
            <Select onChange={changeDepartament}>
              {departamentos.map((departamento) => (
                <Option key={departamento.id} value={departamento.departamento}>
                  {departamento.localidad}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Provincia">
            <Select onChange={changeProvincia}>
              {provincias.map((provincia) => (
                <Option key={provincia.id} value={provincia.provincia}>
                  {provincia.localidad}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Distrito">
            <Select onChange={changeDistrito}>
              {distritos.map((distrito) => (
                <Option key={distrito.id} value={distrito.id}>
                  {distrito.localidad}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="direccion"
            label="Dirección"
            rules={[
              { required: true, message: "Por favor ingrese su Dirección!" },
            ]}
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Dirección"
            />
          </Form.Item>
          <Form.Item
            name="latitud"
            label="Latitud"
            rules={[
              { required: true, message: "Por favor ingrese su Latitud!" },
            ]}
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Latitud"
            />
          </Form.Item>
          <Form.Item
            name="longitud"
            label="Longitud"
            rules={[
              { required: true, message: "Por favor ingrese su Longitud!" },
            ]}
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Longitud"
            />
          </Form.Item>
          {/* <Form.Item
            name="correo"
            label="Correo"
            rules={[
              { required: true, message: "Por favor ingrese su Correo!" },
            ]}
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Correo"
            />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Telefono"
            rules={[
              { required: true, message: "Por favor ingrese su Telefono!" },
            ]}
          >
            <Input
              prefix={<AuditOutlined className="site-form-item-icon" />}
              placeholder="Telefono"
            />
          </Form.Item> */}

          <Form.Item label="Estado" name="estadoAuditoria">
            <Select>
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => setDrawerVisible(false)}
            >
              Cancelar
            </Button>
            <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
              Registrar
            </Button>
          </Form.Item>
        </Form>
      </Scrollbar>
    </div>
  );
};

export default New;
