import styles from './index.module.css'
import { useState } from 'react'
import lodash from 'lodash'
import Modal from '../Modal'
import arrowImg from '../../assets/arrow.svg'
import { itemType } from '../../views/EDA/SCT'
import { emitUpdateList } from '../../ws/ws'

interface propsType {
    question: string,
    answer: string,
    row: number,
    col: number,
    list: Array<itemType>
    setList: Function
}


const ContentBox = (props: propsType) => {

    const { question, answer, row, col, list, setList } = props
    const [modalIsShow, setModalIsShow] = useState(false)
    const [currentRow, setCurrentRow] = useState('')
    const [currentCol, setCurrentCol] = useState('')

    //向下增加一行
    const addRow = (currentRow: string) => {
        let listClone = lodash.cloneDeep(list)

        for (let i = 0; i < listClone.length; i++) {
            if (String(listClone[i].row) === currentRow) {
                listClone.push({ row: listClone.length, col: 0, question: '', answer: '', editing: '', children: [] })

                setList(listClone)
                emitUpdateList(listClone)

                return
            }
        }
    }

    //向右增加一列
    const addCol = (currentRow: string) => {
        let listClone = lodash.cloneDeep(list)

        for (let i = 0; i < listClone.length; i++) {
            if (String(listClone[i].row) === currentRow) {
                listClone[i].children.push({ row: i, col: listClone[i].children.length + 1, question: '', answer: '', editing: '', children: [] })

                setList(listClone)
                emitUpdateList(listClone)

                return
            }
        }
    }

    //判断是否可编辑，是才显示模态框
    const handleDBCEdit = (dBCRow: string, dBCCol: string) => {
        //如果就是在第0列，则无需遍历子节点了
        if (dBCCol === '0') {
            for (let item of list) {
                if (String(item.row) === dBCRow) {
                    if (item.editing === '') {
                        //模态框显示/隐藏
                        setModalIsShow(true)

                        return
                    }
                }
            }
        }

        //如果在其他列，则需要遍历子节点
        for (let item of list) {
            if (item.children.length === 0) {
                continue
            }

            for (let childrenItem of item.children) {
                if (String(childrenItem.row) === dBCRow && String(childrenItem.col) === dBCCol) {
                    if (childrenItem.editing === '') {
                        //模态框显示/隐藏
                        setModalIsShow(true)

                        return
                    }
                }
            }
        }
    }

    return (
        // 双击行为控制
        <div
            className={styles['content']}
            onDoubleClick={(e) => {
                let dBCRow = e.currentTarget.getAttribute('data-row')!
                let dBCCol = e.currentTarget.getAttribute('data-col')!
                //传入当前选中的元素的行和列,因为需要父传子，所以用了hook
                setCurrentRow(dBCRow)
                setCurrentCol(dBCCol)

                handleDBCEdit(dBCRow, dBCCol)
            }}
            data-row={row}
            data-col={col}
        >
            <div className={styles['title']}>{'Why' + (col + 1)}</div>

            <div className={styles['wrapper']}>
                <div className={styles['container']} style={{ borderBottom: '2px solid white' }}>
                    <div className={styles['container-text']} >QUESTION</div>
                    <div>{question}</div>
                </div>

                <div className={styles['container']}>
                    <div className={styles['container-text']}>ANSWER</div>
                    <div>{answer}</div>
                </div>
            </div>

            <div className={styles['dock']}>
                <div className={styles['dock-btn-wrapper']}>
                    {/* 向右加一块 */}
                    <img
                        style={{ transform: 'rotate(-90deg)' }}
                        src={arrowImg}
                        alt='arrowImg'
                        className={styles['dock-btn']}
                        data-row={row}
                        onClick={(e) => { addCol(e.currentTarget.getAttribute('data-row')!) }}
                    />
                </div>
                <div className={styles['dock-btn-wrapper']}>
                    {/* 向下加一块 */}
                    <img
                        src={arrowImg}
                        alt='arrowImg'
                        className={styles['dock-btn']}
                        data-row={row}
                        onClick={(e) => { addRow(e.currentTarget.getAttribute('data-row')!) }}
                    />
                </div>
            </div>

            {
                /* 模态框渲染 */
                modalIsShow ? <Modal
                    question={question}
                    answer={answer}
                    currentRow={currentRow}
                    currentCol={currentCol}
                    setModalIsShow={setModalIsShow}
                    setList={setList}
                    list={list}
                /> : null
            }

        </div>
    )
}

export default ContentBox