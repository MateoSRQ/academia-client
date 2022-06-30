import { useState, useRef, useEffect } from 'react'
import { Drawer, Button } from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import  {motion} from 'framer-motion'
import Menu from '../../components/menu'
import Facultad from '../../pages/facultad'

import Page from '../page'
import {AppstoreOutlined, MailOutlined, SettingOutlined} from "@ant-design/icons";

function Component() {
    const [menuVisible, setMenuVisible] = useState(false)
    const mainVariants = {closed: { x: 0 }, open: { x: "360px"}, semi: {x: '20px'}}

    const setMenuStatus = () => {
        setMenuVisible(!menuVisible)
    }

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
                    <Facultad />
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
