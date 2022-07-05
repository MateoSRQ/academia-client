import { useEffect } from "react"
import { Button, Form, Input, message, Select } from "antd"
import { FileTextOutlined } from "@ant-design/icons"
import { useFacultadStore } from "../../../store/facultad"

const Component = (props: any) => {
    const {        
        form,
        handleClose,
        facultadEditada: { estado, datos },
    } = props
    const { guardarFacultad, actualizarFacultad, cargarLista } = useFacultadStore()
    
    useEffect(() => {
        estado && form.setFieldsValue(datos)
    }, [props.facultadEditada])

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

    return (
        <div>
            <div>
                <h3>{estado ? "Edición" : "Registro"} de Facultad</h3>
                <hr />
                <p>Favor de ingresar la información solicitada</p>
            </div>
            <Form layout="vertical" onFinish={handleFinish} form={form}>
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
                    label="Nombre de Facultad"
                    name="nombre"
                    rules={[{ required: true, message: "Debe ingresar un nombre" }]}
                >
                    <Input
                        prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Abreviatura"
                    name="abreviatura"
                    rules={[{ required: true, message: "Debe ingresar una abreviatura" }]}
                >
                    <Input
                        prefix={<FileTextOutlined style={{ marginRight: "0.5em" }} />}
                    />
                </Form.Item>
                <Form.Item label="Estado" name="activo">
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
