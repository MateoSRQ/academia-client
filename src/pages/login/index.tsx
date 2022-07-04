import { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import style from './index.module.css'
import { useNavigate } from "react-router-dom";
import { useUsuarioStore } from '../../store/usuario';
import 'animate.css';
import 'antd/dist/antd.css'

function Component() {
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const { autenticarUsuario } = useUsuarioStore()

    const handleOnFinish = (e: any) => {
        if (e.password == 'password') {
            const payload = {
                username : e.username,
                ruta : "../app"
            }
            autenticarUsuario(payload)
            navigate("../app", { replace: true });
        }
        else {
            message.error('Verifique sus credenciales y vuelva a intentarlo.')
            setError(true)
        }
    }

    return (
        <div className={style.component}>
            <div className={style.container+" "+[error ? " animate__animated animate__headShake" : ""]}>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={handleOnFinish}
                >
                    <Form.Item
                        label="Nombre de usuario"
                        name="username"
                        rules={[{ required: true, message: 'Debe ingresar nombre de usuario' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"                        
                        rules={[{ required: true, message: 'Debe ingresar una contraseña' }]}
                    >
                        <Input.Password onChange={()=>setError(false)} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            ENVIAR
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Component;