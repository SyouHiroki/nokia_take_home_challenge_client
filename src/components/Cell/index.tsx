import styles from './index.module.css'
import { Rnd } from 'react-rnd'
import ContentBox from '../ContentBox'
import { itemType } from '../../views/EDA/SCT'

interface propsType {
    list: Array<itemType>
}

const Cell = (props: propsType) => {

    const { list } = props

    return (
        <>
            {
                list.map(item => <div key={'row' + item.row + item.col} className={styles['container']}> {/*行*/}

                    <div>
                        <Rnd
                            style={{ position: 'static', display: 'block' }}
                            default={{
                                x: 0,
                                y: 0,
                                width: 600,
                                height: 200,
                            }}
                            minHeight={200}
                            minWidth={162}
                            enableResizing={
                                {
                                    top: false,
                                    right: true,
                                    bottom: true,
                                    left: false,
                                    topRight: false,
                                    bottomRight: false,
                                    bottomLeft: false,
                                    topLeft: false
                                }
                            }
                            disableDragging={true}
                        >
                            <ContentBox
                                question={item.question}
                                answer={item.answer}
                                row={item.row}
                                col={item.col}
                                list={list}
                            />
                        </Rnd>
                    </div>


                    {
                        // 列
                        item.children.map(item => <div key={'col' + item.row + item.col}>
                            <Rnd
                                style={{ position: 'static', display: 'block' }}
                                default={{
                                    x: 0,
                                    y: 0,
                                    width: 600,
                                    height: 200,
                                }}
                                minHeight={200}
                                minWidth={162}
                                enableResizing={
                                    {
                                        top: false,
                                        right: true,
                                        bottom: true,
                                        left: false,
                                        topRight: false,
                                        bottomRight: false,
                                        bottomLeft: false,
                                        topLeft: false
                                    }
                                }
                                disableDragging={true}
                            >
                                <ContentBox
                                    question={item.question}
                                    answer={item.answer}
                                    row={item.row}
                                    col={item.col}
                                    list={list}
                                />
                            </Rnd>
                        </div>)
                    }

                </div>)
            }
        </>
    )
}

export default Cell