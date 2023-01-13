import { createPortal } from 'react-dom'
import lodash from 'lodash'
import styles from './index.module.css'
import { useState } from 'react'
import closeImg from '../../assets/close.svg'

interface itemTpye {
    row: number,
    col: number,
    question: string,
    answer: string,
    children: Array<itemTpye>
}

interface propsType {
    question: string,
    answer: string,
    currentRow: string,
    currentCol: string,
    list: Array<itemTpye>,
    setList: Function,
    setModalIsShow: Function
}

const Modal = (props: propsType) => {

    const { list, setList, currentRow, currentCol, setModalIsShow, question, answer } = props
    const [newQuestion, setNewQuestion] = useState(question)
    const [newAnswer, setNewAnswer] = useState(answer)

    //修改业务
    const handler = () => {
        for (let i = 0; i < list.length; i++) {
            if (String(list[i].row) === currentRow && String(list[i].col) === currentCol) {//找到了
                let listClone = lodash.cloneDeep(list)
                listClone[i].question = newQuestion
                listClone[i].answer = newAnswer
                setList(listClone)

                return
            }

            //没有就不必进去找了
            if (list[i].children.length === 0) {
                continue
            }

            //遍历子节点
            for (let j = 0; j < list[i].children.length; j++) {
                if (String(list[i].children[j].row) === currentRow && String(list[i].children[j].col) === currentCol) {//找到了
                    let listClone = lodash.cloneDeep(list)
                    listClone[i].children[j].question = newQuestion
                    listClone[i].children[j].answer = newAnswer
                    setList(listClone)

                    return
                }
            }
        }
    }

    return createPortal(
        <div className={styles['container']}>

            <div className={styles['wrapper']}>

                <div className={styles['title']}>
                    {'Why' + (parseInt(currentCol) + 1)}
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
                    <button
                        className={styles['btn']}
                        onClick={() => {
                            handler()
                            setModalIsShow(false)
                        }}
                    >Save
                    </button>

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