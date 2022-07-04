import { useState, useRef, useEffect } from "react";
import { Drawer, Button, Space, Col, InputRef } from "antd";
import { Row, Tag, message, Modal, Spin } from "antd";
import { DeleteTwoTone, EditTwoTone, HighlightOutlined, SearchOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined, FolderAddTwoTone } from "@ant-design/icons";
import type { ColumnsType, ColumnType } from 'antd/lib/table';
import type { FilterConfirmProps } from 'antd/lib/table/interface';
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


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  interface DataType {
    id: number;
    codigo: string;
    nombre: string;
    tipo: number;
    idUbigeo: number;
    telefono: string;
    direccion: string;
    latitud: string;
    longitud: string;
    correo: string;
    activo: boolean;
  }

  type DataIndex = keyof DataType;

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: text =>
    // searchedColumn === dataIndex ? (
    //   <HighlightOutlined
    //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
    //     searchWords={[searchText]}
    //     autoEscape
    //     textToHighlight={text ? text.toString() : ''}
    //   />
    // ) : (
    //   text
    // ),
  });


  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      // width: 100,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "100px",
          }}
        >
          {record.id}
        </div>
      ),
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a.id.length - b.id.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Cod Sede",
      dataIndex: "codigo",
      // width: 300,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "150px",
          }}
        >
          {record.codigo}
        </div>
      ),
      ...getColumnSearchProps('codigo'),
      sorter: (a, b) => a.codigo.length - b.codigo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Sede",
      dataIndex: "nombre",
      // width: 300,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "150px",
          }}
        >
          {record.nombre}
        </div>
      ),
      ...getColumnSearchProps('nombre'),
      sorter: (a, b) => a.nombre.length - b.nombre.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Ubigeo",
      dataIndex: "idUbigeo",
      // width: 350,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "150px",
          }}
        >
          {record.idUbigeo}
        </div>
      ),
      ...getColumnSearchProps('idUbigeo'),
      sorter: (a, b) => a.idUbigeo.length - b.idUbigeo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Estado",
      dataIndex: "activo",
      // width: 350,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "150px",
          }}
        >
          {record.activo ? (
            <Tag color={"green"}>{"Activo"}</Tag>
          ) : (
            <Tag color={"red"}>{"Inactivo"}</Tag>
          )}
        </div>
      ),
      ...getColumnSearchProps('activo'),
      sorter: (a, b) => a.activo.length - b.activo.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Accion",
      dataIndex: "",
      // width: 350,
      render: (text, record) => (
        <div
          style={{
            wordWrap: "break-word",
            wordBreak: "break-word",
            // width: "200px",
            textAlign: "center",
          }}
        >
          <EditTwoTone
            className={style.tableIcon}
            twoToneColor="#4241a5"
            style={{ fontSize: "17px" }}
            onClick={() => goToEdit(record)}
            title="Editar"
          />
          &nbsp;&nbsp;&nbsp;
          <DeleteTwoTone
            className={style.tableIcon}
            twoToneColor="#4241a5"
            style={{ fontSize: "17px" }}
            onClick={() => eliminar(record.id)}
            title="Eliminar"
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
              loading={loading}
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
                      total: sede.length,
                      pageSize: 64,
                    }}

                    loading={loading}
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
        title={typeEdit ? "Actualización de sede" : "Registro de sede"}
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
