import { Outlet } from 'react-router-dom'
import TabBar from '../../components/TabBar'
import styles from './index.module.css'

export const EDA = () => {

    const list = [
        { id: 0, text: 'SCT', path: '/eda/sct', flag: 'sct' },
        { id: 1, text: 'ET', path: '/eda/et', flag: 'et' },
        { id: 2, text: 'ST', path: '/eda/st', flag: 'st' },
    ]

    return (
        <div>
            {/* 第二层tabbar */}
            <TabBar list={list} level={2} />

            <Outlet />
        </div>
    )
}

export default EDA