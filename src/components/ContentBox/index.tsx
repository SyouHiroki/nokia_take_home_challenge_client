import styles from './index.module.css'
import { useState } from 'react'
import lodash from 'lodash'
import Modal from '../Modal'
import arrowImg from '../../assets/arrow.svg'
import { itemType } from '../../views/EDA/SCT'
import { emitUpdateList } from '../../ws/ws'

interface propsType {
    editable: boolean,
    question: string,
    answer: string,
    row: number,
    col: number,
    list: Array<itemType>
}


const ContentBox = (props: propsType) => {

    const { question, answer, row, col, list, editable } = props
    const [modalIsShow, setModalIsShow] = useState(false)
    const [currentRow, setCurrentRow] = useState('')
    const [currentCol, setCurrentCol] = useState('')

    //向下增加一行, 防抖预防快速连点数据库撑不住
    const addRow = lodash.debounce(() => {
        let listClone = lodash.cloneDeep(list)
        let makeChildren = []

        //填充足够的列
        for (let i = 0; i < listClone[0].children.length; i++) {
            makeChildren.push({ row: listClone.length, col: i + 1, question: '', answer: '', editable: true, children: [] })
        }

        //将填充足够的children数组作为列插进去
        listClone.push({ row: listClone.length, col: 0, question: '', answer: '', editable: true, children: makeChildren })

        //更新
        emitUpdateList(listClone)
    }, 100)

    //向右增加一列，, 防抖预防快速连点数据库撑不住
    const addCol = lodash.debounce(() => {
        let listClone = lodash.cloneDeep(list)
        let colMark = listClone[0].children.length + 1

        //每一行都要插一个
        for (let i = 0; i < listClone.length; i++) {
            listClone[i].children.push({ row: i, col: colMark, question: '', answer: '', editable: true, children: [] })
        }

        //更新
        emitUpdateList(listClone)
    }, 100)

    //判断是否可编辑，是才显示模态框
    const handleDBCEdit = (dBCRow: string, dBCCol: string) => {

        let listClone = lodash.cloneDeep(list)
        const row = parseInt(dBCRow)
        const col = parseInt(dBCCol)

        if (col === 0) {//如果就是在第0列，则无需找子节点了
            if (listClone[row].editable) {
                //模态框显示/隐藏
                setModalIsShow(true)

                return
            }
        } else {//如果在其他列，则需要找子节点
            if (listClone[row].children[col - 1].editable) {/* col-1是因为row占用了一位，换到col里就需要-1，要是不明白可以打印一下col看看就知道 */
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
                //传入当前选中的元素的行和列,因为需要父传子，所以用了hooks
                setCurrentRow(dBCRow)
                setCurrentCol(dBCCol)

                handleDBCEdit(dBCRow, dBCCol)
            }}
            data-row={row}
            data-col={col}
        >
            <div className={styles['title']}>{'Why' + (col + 1)}</div>

            <div className={`${styles['wrapper']} ${question === '' && answer === '' ? styles['wrapper-white-bgc'] : ''} ${editable ? '' : styles['wrapper-red-bgc']}`}>
                <div className={styles['container']} style={{ borderBottom: '2px solid white' }}>
                    {question !== '' || answer !== '' ? <div className={styles['container-text']}>QUESTION</div> : null}
                    <div>{question}</div>
                </div>

                <div className={styles['container']}>
                    {question !== '' || answer !== '' ? <div className={styles['container-text']}>ANSWER</div> : null}
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
                        onClick={() => { addCol() }}
                    />
                </div>
                <div className={styles['dock-btn-wrapper']}>
                    {/* 向下加一块 */}
                    <img
                        src={arrowImg}
                        alt='arrowImg'
                        className={styles['dock-btn']}
                        onClick={() => { addRow() }}
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