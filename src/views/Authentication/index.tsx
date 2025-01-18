import React, { useState } from 'react'
import './style.css'

// component: 인증 화면 컴포넌트
export default function Authentication() {

  // state: 화면 상태 (view : sign-in / sign-up 두 가지 상태만 가질 수 있음음)
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  // component: sign-in card 컴포넌트 
  const SignInCard = () => {
    return (
      <div className='auth-card'></div>
    )
  }

  // component: sign-up card 컴포넌트 
  const SignUpCard = () => {
    return (
      <div className='auth-card'></div>
    )
  }

    // render: 인증 화면 컴포넌트 랜더링링
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영한다'}</div>
              <div className='auth-jumbotron-text'>{'게이들아'}</div>
            </div>
          </div>
        </div>
          {view === 'sign-in' && <SignInCard/>}
          {view === 'sign-up' && <SignUpCard/>}
      </div>
    </div>
  )
}
