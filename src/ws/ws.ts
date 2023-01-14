import socketIo from 'socket.io-client'
import { itemType } from '../views/EDA/SCT'

//连接
const sio = socketIo('http://localhost:5000')

//更新后台列表
export const emitUpdateList = (list: Array<itemType>) => {
    sio.emit('send-data-to-server', JSON.stringify({
        data: list
    }))
}

//监听
export const connectServer = (setList: Function) => {

    sio.on('connect', () => {
        console.log('connected, socket id:', sio.id)
    })


    sio.on('send-data-to-client', (payload) => {
        let listData = JSON.parse(payload[0]).data

        setList(listData)
    })
}