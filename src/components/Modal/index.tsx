import { createPortal } from 'react-dom'
import lodash from 'lodash'
import styles from './index.module.css'
import { useEffect, useState } from 'react'
import closeImg from '../../assets/close.svg'
import { itemType } from '../../views/EDA/SCT'
import { emitUpdateList } from '../../ws/ws'

interface propsType {
    question: string,
    answer: string,
    currentRow: string,
    currentCol: string,
    list: Array<itemType>,
    setModalIsShow: Function
}

const Modal = (props: propsType) => {

    const { list, currentRow, currentCol, setModalIsShow, question, answer } = props
    const [newQuestion, setNewQuestion] = useState(question)
    const [newAnswer, setNewAnswer] = useState(answer)

    const setNonEditable = () => {
        let listClone = lodash.cloneDeep(list)
        const row = parseInt(currentRow)
        const col = parseInt(currentCol)

        if (col === 0) {//如果就是在第0列，则无需找子节点了
            listClone[row].editable = false

            emitUpdateList(listClone)
        } else {//如果在其他列，则需要找子节点
            // col-1是因为row占用了一位，换到col里就需要-1，要是不明白可以打印一下col看看就知道 
            listClone[row].children[col - 1].editable = false

            emitUpdateList(listClone)
        }

    }

    useEffect(() => {
        //进来后第一时间设置不可编辑，防止同时修改
        setNonEditable()
    }, [])

    //修改业务
    const confirm = () => {
        let listClone = lodash.cloneDeep(list)
        const row = parseInt(currentRow)
        const col = parseInt(currentCol)

        if (col === 0) {//如果就是在第0列，则无需找子节点了
            listClone[row].question = newQuestion
            listClone[row].answer = newAnswer
            listClone[row].editable = true

            emitUpdateList(listClone)
        } else {//如果在其他列，则需要找子节点
            // col-1是因为row占用了一位，换到col里就需要-1，要是不明白可以打印一下col看看就知道 
            listClone[row].children[col - 1].question = newQuestion
            listClone[row].children[col - 1].answer = newAnswer
            listClone[row].children[col - 1].editable = true

            emitUpdateList(listClone)
        }
    }

    return createPortal(
        <div className={styles['container']}>

            <div className={styles['wrapper']}>

                <div className={styles['title']}>
                    {'Why' + (parseInt(currentCol) + 1)}
                    {/* 关闭按钮 */}
                    <img
                        src={closeImg}
                        alt='closeImg'
                        className={styles['colse-btn']}
                        onClick={() => { setModalIsShow(false) }}
                    />
                </div>

                <div className={styles['content']}>
                    <div className={styles['block']}>
                        <div className={styles['block-title']}>QUESTION:</div>

                        <div className={styles['input-box-wrapper']}>
                            <textarea
                                className={styles['input-box']}
                                value={newQuestion}
                                onChange={(e) => { setNewQuestion(e.currentTarget.value) }}
                            />
                        </div>
                    </div>

                    <div className={styles['block']}>
                        <div className={styles['block-title']}> ANSWER:</div>

                        <div className={styles['input-box-wrapper']}>
                            <textarea
                                className={styles['input-box']}
                                value={newAnswer}
                                onChange={(e) => { setNewAnswer(e.currentTarget.value) }}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles['btn-container']}>
                    {/* 确定按钮 */}
                    <button
                        className={styles['btn']}
                        onClick={() => {
                            confirm()
                            setModalIsShow(false)
                        }}
                    >Save
                    </button>

                    {/* 取消按钮 */}
                    <button
                        className={styles['btn']}
                        onClick={() => { setModalIsShow(false) }}
                    >Cancel
                    </button>
                </div>

            </div>

        </div >
        , document.body)
}

export default Modal