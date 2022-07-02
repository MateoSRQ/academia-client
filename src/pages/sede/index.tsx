import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  Button,
  Space,
  Col,
  Row,
  Tag,
  message,
  Modal,
  Spin,
  Alert,
} from "antd";
import { Tooltip } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
  ExclamationCircleOutlined,
  FolderAddTwoTone,
} from "@ant-design/icons";
import { Breadcrumb } from "antd";
import style from "./index.module.css";
import "antd/dist/antd.css";
import { Tabs, Radio } from "antd";
import { Input } from "antd";
import Scrollbar from "react-custom-scrollbars";
import axios from "axios";
import Table from "../../components/table";
import New from "./new";
import { useSedeStore, locationStore } from "../../store/sede";
import { SizeType } from "antd/lib/config-provider/SizeContext";

const { Search } = Input;
const { TabPane } = Tabs;

function Component() {
  const ref = useRef<HTMLDivElement>();
  const [dimensions, setDimensions] = useState({
    x: 0,
    y: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    width: 0,
  });
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [sedeEditada, setSedeEditada] = useState({
    estado: false,
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

  const [dataSede, setDataSede] = useState<any[]>([]);

  const [size, setSize] = useState<SizeType>("large");
  const { sede, listarSedes, loading, eliminarSede } = useSedeStore();

  // const alumnos = useStore((state) => state.alumnos)

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 100,
      render: (text, record) => (
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
      title: "Cod Sede",
      dataIndex: "codigo",
      width: 300,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "150px",
          }}
        >
          {record.codigo}
        </div>
      ),
    },
    {
      title: "Sede",
      dataIndex: "nombre",
      width: 300,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "150px",
          }}
        >
          {record.nombre}
        </div>
      ),
    },
    {
      title: "Ubigeo",
      dataIndex: "idUbigeo",
      width: 350,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "150px",
          }}
        >
          {record.idUbigeo}
        </div>
      ),
    },
    {
      title: "Estado",
      dataIndex: "estadoAuditoria",
      width: 350,
      render: (text, record) => (
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
      title: "Accion",
      dataIndex: "",
      width: 350,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            width: "200px",
          }}
        >
          <Tooltip title="Editar" style={{ marginRight: "10px" }}>
            <Button
              onClick={() => {
                handleClick(1);
              }}
              type="default"
              shape="circle"
              icon={
                <EditTwoTone
                  twoToneColor="#4241a5"
                  style={{ fontSize: "26px" }}
                />
              }
            />
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button
              onClick={() => {
                eliminar(record.id);
              }}
              type="default"
              shape="circle"
              icon={
                <DeleteTwoTone
                  twoToneColor="#4241a5"
                  style={{ fontSize: "26px" }}
                />
              }
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    listarSedes(0);
    if (ref && ref.current) {
      setDimensions(ref.current.getBoundingClientRect().toJSON());
    }
  }, []);

  const handleClick = (button: number) => {
    switch (button) {
      case 1:
        setDrawerVisible(true);
        break;
      default:
        break;
    }
  };
  const eliminar = (id: number) => {
    Modal.confirm({
      title: "Eliminar información",
      icon: <ExclamationCircleOutlined />,
      content: "¿Desea eliminar esta información?",
      okText: "Aceptar",
      cancelText: "Cerrar",
      onOk: async () => {

        try {
          const response = await eliminarSede(id);
          const { resultado, mensaje } = response.data;
          if (resultado === 1) {
            message.success(mensaje);
          } else {
            message.error(mensaje);
          }
        } catch (error) {
          message.error("Ocurrió un error, por favor intente nuevamente");
        }

      },
    });
  };

  const handleClose = (button: number) => {
    switch (button) {
      case 1:
        setDrawerVisible(false);

        break;
      default:
        break;
    }
  };
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
            <div className={style.header2}>Listado de Sedes</div>
            <div className={style.header3}>
              Listado del número 501 al 599, activos únicamente
            </div>
            {/* <div className={style.header3}>
                            Listado de información : 01 al{" "}
                            {data.length > 9
                                ? data.length
                                : "0" + data.length}
                        </div> */}
          </Col>
          <Col span={8} style={{ textAlign: "right" }}>
            <Search
              style={{ width: "280px", marginTop: "12px" }}
              placeholder="Buscar"
              enterButton="Buscar"
              size="large"
              loading
            />
          </Col>
        </Row>
      </div>
      {loading ? (
        <div className={style.loading}>
          <Spin size="large" tip="Cargando tabla..." />
        </div>
      ) : (
        <Tabs className={style.tabs}>
          <TabPane tab="Bandeja de información" className={style.tab}>
            <div>
              <div
                style={{ width: "calc(100% - 150px)", position: "relative" }}
              >
                <Scrollbar
                  style={{
                    height: dimensions.height - 256 + "px",
                    outline: "1px solid white",
                  }}
                >
                  <div
                    style={{ height: "10000px", width: "calc(100% - 20px)" }}
                  >
                    <Table
                      data={sede}
                      columns={columns}
                      pagination={{
                        pageSize: 10,
                      }}
                    ></Table>
                  </div>
                </Scrollbar>
              </div>
              <Space
                className={style.rightBar}
                style={{ display: "flex" }}
                direction="vertical"
              >
                <Button
                  block
                  onClick={() => {
                    handleClick(1);
                  }}
                >
                  <FolderAddTwoTone
                    twoToneColor="#4241a5"
                    style={{ fontSize: "26px", color: "#08c" }}
                  />
                </Button>
              </Space>
              <Drawer
                title="Crear nueva sede"
                width={450}
                visible={drawerVisible}
                onClose={() => {
                  handleClose(1);
                }}
                style={{ position: "absolute" }}
                closable={false}
              >
                <New setDrawerVisible={setDrawerVisible} />
              </Drawer>
            </div>
          </TabPane>
        </Tabs>
      )}
    </div>
  );
}

export default Component;
