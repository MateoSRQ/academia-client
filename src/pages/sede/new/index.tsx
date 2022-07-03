import { useState, useEffect } from "react";
import { Button, Form, Select, message } from "antd";
import style from "./index.module.css";
import "antd/dist/antd.css";
import { Input } from "antd";
import Scrollbar from "react-custom-scrollbars";
import {
  SaveOutlined,
  CloseCircleOutlined,
  AuditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useSedeStore, locationStore } from "../../../store/sede";
import { propsNew } from "./new.interfaces";

const { Option } = Select;

const New = (props: propsNew) => {
  //Props
  const { setDrawerVisible, typeEdit, data } = props;
  //Stores
  const { departamentos, provincias, distritos } = locationStore();
  const { listarDeparment, listarProvincias, listarDistritos } =
    locationStore();
  const { guardarSede, actualizarSede } = useSedeStore();
  //Estados locales
  const [deparment, setDeparment] = useState("");
  const [provincia, setProvincia] = useState("");
  const [distrito, setDistrito] = useState("");
  const [form] = Form.useForm();
  useEffect(() => {
    listarDeparment();
    form.resetFields();
    setDeparment("");
    setProvincia("");
    setDistrito("");
    if (typeEdit && data) {
      form.setFieldsValue({
        codigo: data.codigo,
        nombre: data.nombre,
        direccion: data.direccion,
        latitud: data.latitud,
        longitud: data.longitud,
        estadoAuditoria: data.estadoAuditoria,
      });
      setDeparment(data.ubigeo.departamento);
      listarProvincias(data.ubigeo.departamento);
      setProvincia(data.ubigeo.provincia);
      listarDistritos(data.ubigeo.departamento, data.ubigeo.provincia);
      setDistrito(data.ubigeo.id);
    }
  }, [typeEdit, data]);

  const changeDepartament = (value: string) => {
    listarProvincias(value);
    setDeparment(value);
    setDistrito("");
    setProvincia("");
  };

  const changeProvincia = (value: string) => {
    setProvincia(value);
    listarDistritos(deparment, value);
  };

  const changeDistrito = (value: string) => {
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
    if (typeEdit) {
      dataSave.id = data.id;
      dataSave.ubigeo = {
        id: 0,
        departamento: "string",
        provincia: "string",
        distrito: "string",
      };
    }
    try {
      const response = typeEdit
        ? await actualizarSede(dataSave)
        : await guardarSede(dataSave);
      const { resultado, mensaje } = response;
      if (resultado === 1) {
        message.success(mensaje);
        setDrawerVisible(false);
        form.resetFields();
        setDeparment("");
        setDistrito("");
        setProvincia("");
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
            <Select onChange={changeDepartament} value={deparment}>
              {departamentos.map((departamento) => (
                <Option key={departamento.id} value={departamento.departamento}>
                  {departamento.localidad}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Provincia">
            <Select onChange={changeProvincia} value={provincia}>
              {provincias.map((provincia) => (
                <Option key={provincia.id} value={provincia.provincia}>
                  {provincia.localidad}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Distrito">
            <Select onChange={changeDistrito} value={distrito}>
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

          <div className={style.containerButton}>
            <Button
              icon={<CloseCircleOutlined />}
              onClick={() => setDrawerVisible(false)}
            >
              Cancelar
            </Button>
            <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Scrollbar>
    </div>
  );
};

export default New;
