import React from 'react'
import './style.css'

// component: footer layout
export default function Footer() {
    // event handler: 인스타 아이콘 버튼 클릭 이벤트
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com/gajun_choi/')
    }
    // event handler: 네이버 블로그 아이콘 버튼 클릭 이벤트
    const onNaverBlogIconButtonClickHandler = () => {
        window.open('https://naver.com')
    }
  return (
    // render : Footer Layout
    <div id='footer'>
        <div className='footer-container'>
            <div className='footer-top'>
                <div className='footer-logo-box'>
                    <div className='icon-box'>
                        <div className='icon logo-light-icon'></div>
                    </div>
                    <div className='footer-logo-text'>{'Jun\'s Board'}</div>
                </div>
                <div className='footer-link-box'>
                    <div className='footer-email-link'>{'gajun.choi@gmail.com'}</div>
                    <div className='icon-button'>
                        <div className='icon insta-icon' onClick={onInstaIconButtonClickHandler}></div>
                    </div>
                    <div className='icon-button'>
                        <div className='icon naver-blog-icon' onClick={onNaverBlogIconButtonClickHandler}></div>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='footer-copyright'>Copyright @ 2025 Jun's All Rights Reserved</div>
            </div>
        </div>
    </div>
  )
}
