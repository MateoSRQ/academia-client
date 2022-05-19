import {useState, useRef, useEffect, useLayoutEffect} from 'react'
import {Drawer, Button, Space, Col, Row} from 'antd';
import {Tooltip} from 'antd';
import { Menu, Dropdown } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Breadcrumb} from 'antd';
import style from './index.module.css'
import 'antd/dist/antd.css'
import { Tabs, Radio } from 'antd';
import { Input } from 'antd';
import Scrollbar from 'react-custom-scrollbars'
import useDimensions from 'react-use-dimensions'

const { Search } = Input;
const { TabPane } = Tabs;

function Component() {

    return (
        <div className={style.component} >
            RIGHT BAR

        </div>
    )
}

export default Component
