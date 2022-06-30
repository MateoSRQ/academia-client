import { useState, useRef, useEffect } from 'react'
import { Drawer, Button, Form, Input, Checkbox } from 'antd';
import style from './index.module.css'
import { useNavigate } from "react-router-dom";
import 'animate.css';


import 'antd/dist/antd.css'

function Component() {
    let navigate = useNavigate();
    const handleOnFinish = (e: any) => {

        if (e.username == 'user' && e.password == 'password') {
            navigate("../app", { replace: true });
        }
        else {
            console.log('NOK')
        }
    }


    return (


        <div className={style.component}>
            <div className={style.container + ' ' + 'animate__animated animate__headShake'}>
                <Form
                    name="login"
                    layout="vertical"
                    onFinish={handleOnFinish}
                >
                    <Form.Item
                        label="Nombre de usuario"
                        name="username"
                    //rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                    //rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
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