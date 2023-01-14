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
}


const ContentBox = (props: propsType) => {

    const { question, answer, row, col, list } = props
    const [modalIsShow, setModalIsShow] = useState(false)
    const [currentRow, setCurrentRow] = useState('')
    const [currentCol, setCurrentCol] = useState('')

    //向下增加一行
    const addRow = (currentRow: string) => {
        let listClone = lodash.cloneDeep(list)

        for (let i = 0; i < listClone.length; i++) {
            if (String(listClone[i].row) === currentRow) {
                listClone.push({ row: listClone.length, col: 0, question: '', answer: '', editable: true, children: [] })

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
                listClone[i].children.push({ row: i, col: listClone[i].children.length + 1, question: '', answer: '', editable: true, children: [] })

                emitUpdateList(listClone)

                return
            }
        }
    }

    //判断是否可编辑，是才显示模态框
    const handleDBCEdit = (dBCRow: string, dBCCol: string) => {

        let listClone = lodash.cloneDeep(list)
        const row = parseInt(dBCRow)
        const col = parseInt(dBCCol)

        if (col === 0) {//如果就是在第0列，则无需找子节点了
            if (listClone[row].editable) {
                //进来后第一时间设置不可编辑，防止同时修改
                listClone[row].editable = false
                //发送到服务器
                emitUpdateList(listClone)
                //TODO: 打开模态框设置不可编辑，也上传服务器了，但是另外一边还是可以编辑

                //模态框显示/隐藏
                setModalIsShow(true)

                return
            }
        } else {//如果在其他列，则需要找子节点
            if (listClone[row].children[col - 1].editable) {/* col-1是因为row占用了一位，换到col里就需要-1，要是不明白可以打印一下col看看就知道 */
                //进来后第一时间设置不可编辑，防止同时修改
                listClone[row].editable = false
                // 发送到服务器
                emitUpdateList(listClone)
                //TODO: 打开模态框设置不可编辑，也上传服务器了，但是另外一边还是可以编辑

                //模态框显示/隐藏
                setModalIsShow(true)

                return
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
                    list={list}
                /> : null
            }

        </div>
    )
}

export default ContentBox