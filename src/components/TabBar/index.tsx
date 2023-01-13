import { NavLink, useLocation } from 'react-router-dom'
import styles from './index.module.css'

interface itemType {
    id: number,
    text: string,
    path: string,
    flag: string
}

interface propsType {
    list: Array<itemType>,
    level: number
}

const TabBar = (props: propsType) => {

    const { list, level } = props
    const current = useLocation().pathname.split('/')[level] //从url中切出当前路由级别，为添加activeClass提供标识，react-router-dom v6去掉内置activeClass属性了（切出来的数组第0项目是空串，所以要加1，但是刚刚好level是从1开始的，比0大1）

    return (
        <div className={`${level === 1 ? styles['blue-strip'] : null}`}>
            <div className={styles['tabbar']}>
                {
                    list.map(item => <NavLink
                        className={`${styles['tab']} ${current === item.flag ? styles['tab-active'] : null} ${styles[`${'tab-level' + level}`]}`} //样式分别是tab固有样式、选中后样式、层级样式，层级样式可以去css处自己新增
                        to={item.path}
                        key={item.id}
                    >
                        {item.text}
                    </NavLink>)
                }
            </div>
        </div >
    )
}

export default TabBar