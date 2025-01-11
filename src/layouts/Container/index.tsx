import Header from '../Header'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import { AUTH_PATH } from '@src/constants';

// component: 레이아웃
export default function Container() {
    // state: 현재 페이지의 path name 상태
    const { pathname } = useLocation(); 

    // render: 레이아웃 렌더링
    /* 경로가 auth인 경우에 Header/Footer 안보임 */
  return (
    <>
        <Header/>
        <Outlet/>
        { pathname !== AUTH_PATH() && <Footer/>}
    </>
  )
}
