import { useEffect, useState } from 'react'
import Cell from '../../../components/Cell'
import styles from './index.module.css'

export const SCT = () => {

    const mock = [
        {
            row: 0, col: 0, question: '', answer: '', editable: true, children: [
                // { row: 0, col: 1, question: 'row: 0', answer: 'col: 1', children: [] }
            ]
        },
        // {
        //     row: 1, col: 0, question: 'row: 1', answer: 'col: 0', children: [

        //     ]
        // },
        // {
        //     row: 2, col: 0, question: 'row: 2', answer: 'col: 0', children: [
        //         { row: 2, col: 1, question: 'row: 2', answer: 'col: 1', children: [] },

        //     ]
        // },
        // {
        //     row: 3, col: 0, question: 'row: 3', answer: 'col: 0', children: [
        //         { row: 3, col: 1, question: 'row: 3', answer: 'col: 1', children: [] },
        //         { row: 3, col: 2, question: 'row: 3', answer: 'col: 2', children: [] },
        //     ]
        // },


    ]


    // [{row: 0, col: 0, question: '', answer: '', children: []}]


    //修改触发重新渲染
    const [list, setList] = useState(mock)

    useEffect(() => {
        console.log('发请求，拿到list')

        return () => {

        }
    }, [list])


    return (
        <div className={styles['container']}>
            <Cell list={list} setList={setList} />
        </div>
    )
}

export default SCT