import { useEffect } from "react"
import { Button, Form, Input, message, Select } from "antd"
//import style from "../facultad/index.module.css"
import "antd/dist/antd.css"
import { FileTextOutlined } from "@ant-design/icons"
import { useFacultadStore } from "../../../store/facultad"

const Component = (props: any) => {
  
  const { setResponseTime, handleClose, formRef, facultadEditada: { estado, datos } } = props
  const { guardarFacultad, actualizarFacultad }  = useFacultadStore()
  const [ form ] = Form.useForm()  

  useEffect(() => {
    (estado) && form.setFieldsValue(datos)    
  }, [props.facultadEditada])

    const handleFinish = async (e: any) => {
    if (estado) {
      const response = await actualizarFacultad(e)
      console.log(response)
      const { resultado, mensaje } = response.data      
      if (resultado === 1) {        
        setResponseTime(response.responseTime)
        message.success(mensaje)
      } else {
        message.error(mensaje)
      }
    } else {
      const response = await guardarFacultad(e)      
      const { resultado, mensaje } = response.data
      if (resultado === 1) {
        message.success(mensaje)
        setResponseTime(response.responseTime)
      } else {
        message.error(mensaje)
      }
    }
    handleClose(1)
  }
  return (
    <div>
      <div>
        <h3>{estado ? "Edición" : "Registro"} de Facultad</h3>
        <hr />
        <p>Favor de ingresar la información solicitada</p>
      </div>
      <Form layout="vertical" onFinish={handleFinish} form={form} ref={formRef}>
        <Form.Item label="Id" name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Código" name="codigo" rules={[{ required: true, message: "Debe ingresar un código" }]}>
          <Input prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />} />
        </Form.Item>

        <Form.Item
          label="Nombre de Facultad"
          name="nombre"
          rules={[{ required: true, message: "Debe ingresar un nombre" }]}
        >
          <Input prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />} />
        </Form.Item>

        <Form.Item
          label="Abreviatura"
          name="abreviatura"
          rules={[{ required: true, message: "Debe ingresar una abreviatura" }]}
        >
          <Input prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />} />
        </Form.Item>
        <Form.Item label="Estado" name="estadoAuditoria">
            <Select>
              <Select.Option value={true}>Activo</Select.Option>
              <Select.Option value={false}>Inactivo</Select.Option>
            </Select>
          </Form.Item>
        {/* Opcion a select
                    <Form.Item
                        label="Estado"
                        name="estado"
                        rules={[{ required: true, message: "Debe escoger el estado" }]}
                    >
                        <Radio.Group>
                            <Radio value={1}>Activo</Radio>
                            <Radio value={0}>Inactivo</Radio>
                        </Radio.Group>
                    </Form.Item>
                    */}
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" block>
            {estado ? "Actualizar" : "Registrar"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Component
