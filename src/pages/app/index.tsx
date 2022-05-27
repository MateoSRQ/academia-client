import { useState, useRef, useEffect } from 'react'
import { Drawer, Button } from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import  {motion} from 'framer-motion'
import Menu from '../../components/menu'

import Page from '../page'
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

function Component() {
    const [menuVisible, setMenuVisible] = useState(false)
    const mainVariants = {closed: { x: 0 }, open: { x: "360px"}, semi: {x: '20px'}}

    const setMenuStatus = () => {
        setMenuVisible(!menuVisible)
    }

    // <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
    //     <Menu.ItemGroup key="g1" title="Item 1">
    //         <Menu.Item key="1">Option 1</Menu.Item>
    //         <Menu.Item key="2">Option 2</Menu.Item>
    //     </Menu.ItemGroup>
    //     <Menu.ItemGroup key="g2" title="Item 2">
    //         <Menu.Item key="3">Option 3</Menu.Item>
    //         <Menu.Item key="4">Option 4</Menu.Item>
    //     </Menu.ItemGroup>
    // </SubMenu>
    // <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
    //     <Menu.Item key="5">Option 5</Menu.Item>
    //     <Menu.Item key="6">Option 6</Menu.Item>
    //     <SubMenu key="sub3" title="Submenu">
    //         <Menu.Item key="7">Option 7</Menu.Item>
    //         <Menu.Item key="8">Option 8</Menu.Item>
    //     </SubMenu>
    // </SubMenu>
    // <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
    //     <Menu.Item key="9">Option 9</Menu.Item>
    //     <Menu.Item key="10">Option 10</Menu.Item>
    //     <Menu.Item key="11">Option 11</Menu.Item>
    //     <Menu.Item key="12">Option 12</Menu.Item>
    // </SubMenu>

    const items = [
        {
            key: 'sub1',
            name: 'Navigation One',
            groups: [
                {
                    key: 'group1', name: 'Group 1', subitems: [
                        {key: 1, name: 'SubItem 01'},
                        {key: 2, name: 'SubItem 02'}
                    ]
                },
                {
                    key: 'group2', name: 'Group 2', subitems: [
                        {key: 3, name: 'SubItem 03'},
                        {key: 4, name: 'SubItem 04'}
                    ]
                },
            ]
        },
        {
            key: 'sub2',
            name: 'Navigation Two',
            groups: [
                {
                    key: 'group3', name: 'Group 1', subitems: [
                        {key: 5, name: 'SubItem 05'},
                        {key: 6, name: 'SubItem 06'}
                    ]
                },
                {
                    key: 'group4', name: 'Group 2', subitems: [
                        {key: 7, name: 'SubItem 07'},
                        {key: 8, name: 'SubItem 08'}
                    ]
                },
            ]
        },

    ];


    return (
        <div className={style.component}>
            <div className={style.menuContainer}>
                <Menu items={items}/>
            </div>
            <motion.div
                className={style.mainContainer}
                variants={mainVariants}
                animate={menuVisible?"open":"closed"}
            >
                <div className={style.container}>
                    <Page />
                </div>
                <div
                    onClick={setMenuStatus}
                    className={style.leftSideButton}
                >
                </div>
            </motion.div>
        </div>
    )
}

export default Component
