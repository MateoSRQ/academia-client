import { useState, useRef, useEffect } from 'react'
import { Menu, Table } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion'
const { SubMenu } = Menu;

import style from './index.module.css'
import 'antd/dist/antd.css'

function Component(props: any) {

    // console.log('variables')
    // console.log('variables =', props)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [data, setData] = useState([])

    const onSelectChange = (selectedRowKeys: any) => {
        // console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleClick = (e: any) => {
        // console.log('click ', e);
    }

    return (
        <div className={style.component}>
            <Table
                // rowSelection={rowSelection}
                columns={props.columns}
                dataSource={props.data}
                size="small"
                pagination={props.pagination}
            />
        </div>
    )
}

export default Component
