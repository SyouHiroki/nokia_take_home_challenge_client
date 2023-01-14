import { useEffect, useState } from 'react'
import Cell from '../../../components/Cell'
import { connectServer } from '../../../ws/ws'
import styles from './index.module.css'

export interface itemType {
    row: number,
    col: number,
    question: string,
    answer: string,
    editing: string,
    children: Array<itemType>
}


export const SCT = () => {

    const admin = [
        {
            row: 0, col: 0, question: '', answer: '', editing: '', children: [
                // { row: 0, col: 1, question: 'row: 0', answer: 'col: 1', children: [] }
            ]
        }
    ]

    //修改触发重新渲染
    const [list, setList] = useState(admin)

    useEffect(() => {
        //websocket连接服务器
        connectServer(setList)
    }, [])


    return (
        <div className={styles['container']}>
            <Cell list={list} setList={setList} />
        </div>
    )
}

export default SCT