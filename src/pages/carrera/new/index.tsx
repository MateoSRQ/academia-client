import { useEffect } from "react"
import { Button, Form, Input, message, Select } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import { useCatalogoStore } from "../../../store/catalogo"
const { Option } = Select
import style from "../../carrera/index.module.css"


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

const Component = (props: any) => {
    /*
    const {        
        form,
        handleClose,
        facultadEditada: { estado, datos },
    } = props
    */
    const { catalogo } = useCatalogoStore()

    const displayInfo = _data.entries()    
    let counter = 0
    for (let x of displayInfo) {      
      if(x[1].estado) {
        counter = counter + 1
      }
    }
    console.log(counter)

    /*
    const handleFinish = async (e: any) => {
        const response = estado
        ? await actualizarFacultad(e)
        : await guardarFacultad(e)
        console.log(response)
        const { resultado, mensaje } = response.data
        if (resultado === 1) {
            cargarLista()
            message.success(mensaje)
        } else {
            message.error(mensaje)
        }
        handleClose(1)
    }
*/
    return (
        <div>
            <div>
                <h3>{props.estado ? "Edición" : "Registro"} de Carrera</h3>
                <hr />
                <p>Favor de ingresar la información solicitada</p>
            </div>
            <Form layout="vertical">
                <Form.Item label="Id" name="id" hidden>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Código"
                    name="codigo"
                    rules={[{ required: true, message: "Debe ingresar un código" }]}
                >
                    <Input
                        prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Nombre de Carrera"
                    name="nombre"
                    rules={[{ required: true, message: "Debe ingresar un nombre" }]}
                >
                    <Input
                        prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />}
                    />
                </Form.Item>

                <Form.Item label="Facultad" name="facultad" rules={[{ required: true }]}>
                    <Select placeholder="Seleccione...">
                    {catalogo.facultad &&
                            catalogo.facultad.map((el: any) => (
                                <Option key={el.id} value={el.id}>
                                    {el.nombre}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Grado" name="grado" rules={[{ required: true }]}>
                    <Select placeholder="Seleccione...">
                        {catalogo.grado &&
                            catalogo.grado.map((el: any) => (
                                <Option key={el.id} value={el.id}>
                                    {el.descripcion}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Modalidad"
                    name="modalidad"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Seleccione...">
                        {catalogo.modalidad &&
                            catalogo.modalidad.map((el: any) => (
                                <Option key={el.id} value={el.id}>
                                    {el.descripcion}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Estado" name="activo">
                    <Select placeholder="Seleccione...">
                        <Select.Option value={true}>Activo</Select.Option>
                        <Select.Option value={false}>Inactivo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Sede" name="sede">
                  <Button onClick={()=>props.showDrawer(3)}>{counter} Sedes Asignadas</Button>                   
                </Form.Item>
                <Form.Item>
                    <Button size="large" className={style.btn} htmlType="submit" block type="primary">
                        {props.estado ? "Actualizar" : "Registrar"}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Component
