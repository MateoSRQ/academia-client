import { useState, useRef, useEffect } from "react";
import { Drawer, Button, Space, Col } from "antd";
import { Row, Tag, message, Modal, Spin } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { ExclamationCircleOutlined, FolderAddTwoTone } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import style from "./index.module.css";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import { Input } from "antd";
import Table from "../../components/table";
import New from "./new";
import { useSedeStore } from "../../store/sede";

const { Search } = Input;
const { TabPane } = Tabs;

function Sede() {
  const { sede, listarSedes, loading, eliminarSede } = useSedeStore();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [typeEdit, setTypeEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

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
          <EditTwoTone
            twoToneColor="#4241a5"
            style={{ fontSize: "17px" }}
            onClick={() => goToEdit(record)}
          />
          <DeleteTwoTone
            twoToneColor="#4241a5"
            style={{ fontSize: "17px" }}
            onClick={() => eliminar(record.id)}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    listarSedes(0);
  }, []);

  const goToEdit = (data: any) => {
    setTypeEdit(true);
    setDataEdit(data);
    setDrawerVisible(true);
  };

  const goToCreate = () => {
    setTypeEdit(false);
    setDrawerVisible(true);
  };
  const handleTableChange = (pagination) => {
    // listarSedes(pagination);
    console.log("hola", pagination);
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
    setDrawerVisible(false);
    switch (button) {
      case 1:
        setDrawerVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={style.component}>
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
              <Button>Bienvenido, Mateo!</Button>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={16}>
            <div className={style.header2}>Listado de Sedes</div>

            <div className={style.header3}>
              Listado de información : 01 al{" "}
              {sede.length > 9 ? sede.length : "0" + sede.length}
            </div>
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
                <div style={{ height: "10000px", width: "calc(100% - 20px)" }}>
                  <Table
                    data={sede}
                    columns={columns}
                    pagination={{
                      current: 2,
                      pageSize: 10,
                    }}
                    onChange={handleTableChange}
                    // loading={loading}
                  ></Table>
                </div>
              </div>
              <Space
                className={style.rightBar}
                style={{ display: "flex" }}
                direction="vertical"
              >
                <Button
                  block
                  onClick={() => {
                    goToCreate();
                  }}
                >
                  <FolderAddTwoTone
                    twoToneColor="#4241a5"
                    style={{ fontSize: "26px", color: "#08c" }}
                  />
                </Button>
              </Space>
            </div>
          </TabPane>
        </Tabs>
      )}
      <Drawer
        title={typeEdit ? "Editar sede" : "Registrar sede"}
        width={450}
        visible={drawerVisible}
        onClose={() => {
          handleClose(1);
        }}
        closable={true}
      >
        <New
          setDrawerVisible={setDrawerVisible}
          typeEdit={typeEdit}
          data={dataEdit}
        />
      </Drawer>
    </div>
  );
}

export default Sede;
