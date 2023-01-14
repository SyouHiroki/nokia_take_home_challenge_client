import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import KeepAlive from 'react-activation'
import TabBar from '../components/TabBar'
import EDA from '../views/EDA'
import ET from '../views/EDA/ET'
import SCT from '../views/EDA/SCT'
import ST from '../views/EDA/ST'
import RCA from '../views/RCA'
import RCAFacts from '../views/RCAFacts'
import SUMMARY from '../views/SUMMARY'

export interface itemType {
    id: number,
    text: string,
    path: string,
    flag: string
}

const IndexRouters = () => {

    const list = [
        { id: 0, text: 'RCA-Facts', path: '/rca_facts', flag: 'rca_facts' },
        { id: 1, text: 'RCA', path: '/rca', flag: 'rca' },
        { id: 2, text: 'EDA', path: '/eda', flag: 'eda' },
        { id: 3, text: 'SUMMARY', path: '/summary', flag: 'summary' }
    ]

    return (
        <>
            <HashRouter>

                {/* 首层tabbar */}
                <TabBar list={list} level={1} />

                {/* 路由 */}
                <Routes>
                    <Route path='/rca_facts' element={<RCAFacts />} />

                    <Route path='/rca' element={<RCA />} />

                    <Route path='/eda' element={<EDA />}>
                        <Route path='/eda/sct' element={<KeepAlive><SCT /></KeepAlive>} />
                        <Route path='/eda/et' element={<ET />} />
                        <Route path='/eda/st' element={<ST />} />

                        <Route path='/eda' element={<Navigate to='/eda/sct' />} />
                    </Route>


                    <Route path='/summary' element={<SUMMARY />} />

                    <Route path='/' element={<Navigate to='/eda/sct' />} />
                    <Route path='*' element={<Navigate to='/eda/sct' />} />
                </Routes>
            </HashRouter>
        </>
    )
}

export default IndexRouters