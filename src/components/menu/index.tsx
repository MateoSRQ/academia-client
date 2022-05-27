import { useState, useRef, useEffect } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import  {motion} from 'framer-motion'
const { SubMenu } = Menu;
import Scrollbar from 'react-custom-scrollbars'

import style from './index.module.css'
import 'antd/dist/antd.css'

function Component(props: any) {
    const handleClick = (e: any) => {
        console.log('click ', e);
    };


    // <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
    //     <Menu.ItemGroup key="g1" title="Item 1">
    //         <Menu.Item key="1">Option 1</Menu.Item>
    //         <Menu.Item key="2">Option 2</Menu.Item>
    //     </Menu.ItemGroup>

    let items = props.items.map(function (item: any)  {
        let groups = item.groups.map(function (group: any)  {
            let subitems = group.subitems.map(function (subitem: any) {
                return <Menu.Item key={subitem.key}>{subitem.name}</Menu.Item>
            })
            return (
                <Menu.ItemGroup key={group.key} title={group.name}>
                    {subitems}
                </Menu.ItemGroup>
            )
        })
        return (
            <Menu.SubMenu key={item.key} title={item.name}>
                {groups}
            </Menu.SubMenu>
        )
    })

    return (
        <div className={style.component}>
            <Scrollbar>
                <Menu
                    onClick={handleClick}
                    style={{ width: 320 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {items}

                </Menu>
            </Scrollbar>
        </div>
    )
}

export default Component
