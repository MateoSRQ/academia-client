import { useState, useRef, useEffect } from 'react'
import { Drawer, Button } from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import  {motion} from 'framer-motion'
import Menu from '../../components/menu'

import Page from '../page'

function Component() {
    const [menuVisible, setMenuVisible] = useState(false)
    const mainVariants = {closed: { x: 0 }, open: { x: "360px"}, semi: {x: '20px'}}

    const setMenuStatus = () => {
        setMenuVisible(!menuVisible)
    }

    return (
        <div className={style.component}>
            <div className={style.menuContainer}>
                <Menu />
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
