import { useEffect, useState } from 'react'
import Cell from '../../../components/Cell'
import { connectServer, emitUpdateList } from '../../../ws/ws'
import styles from './index.module.css'

export interface itemType {
    row: number,
    col: number,
    question: string,
    answer: string,
    editable: boolean,
    children: Array<itemType>
}


export const SCT = () => {

    const admin = [
        {
            row: 0, col: 0, question: '', answer: '', editable: true, children: [
                // { row: 0, col: 1, question: 'row: 0', answer: 'col: 1', children: [] }
            ]
        }
    ]

    //数据驱动视图更新：修改数据触发重新渲染
    const [list, setList] = useState(admin)

    useEffect(() => {
        //websocket连接服务器
        connectServer(setList)
    }, [])


    return (
        <div className={styles['container']}>
            <Cell list={list} />
            <button onClick={() => {
                setList(admin)
                emitUpdateList(admin)
            }}>debug:clear all</button>
        </div>
    )
}

export default SCT