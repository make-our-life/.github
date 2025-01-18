import React, { KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from '@src/components/InputBox';

// component: 인증 화면 컴포넌트
export default function Authentication() {

  // state: 화면 상태 (view : sign-in / sign-up 두 가지 상태만 가질 수 있음음)
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  // component: sign-in card 컴포넌트 
  const SignInCard = () => {

    // state: 이메일 요소 참조 상태 
    const emailRef = useRef<HTMLInputElement | null>(null);
    // state: 비밀번호호 요소 참조 상태 
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // state: 이메일 상태 
    const [email, setEmail] = useState<string>('');
    // state: 패스워드 상태 
    const [password, setPassword] = useState<string>('');
    // state: 패스워드 타입 상태 
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    // state: 패스워드 버튼 아이콘 상태 (visible / invisible) 
    const [passwordButtonIcon, setpasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    // state: 에러 상태 
    const [error, setError] = useState<boolean>(false);

    // event handler: 로그인 버튼 클릭 이벤트 처리 
    const onSignInButtonClickHandler = () => {

    } 

    // event handler: password 버튼 클릭 이벤트 처리 함수 
    const onPasswordButtonClickHandler = () => {
      if(passwordType === 'text') {
        setPasswordType('password');
        setpasswordButtonIcon('eye-light-off-icon')
      } else {
        setPasswordType('text');
        setpasswordButtonIcon('eye-light-on-icon');
      }
    }

    // event handler: 이메일 key down 이벤트 처리 함수 
    const onEmailKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return; // Enter 치면 password 창으로 포커스 이동
      if(!passwordRef.current) return; // passwordRef가 존재하지 않으면 return
      passwordRef.current.focus();
    }

    // event handler: 이메일 key down 이벤트 처리 함수 
    const onPasswordKeyDownHandler = (event:KeyboardEvent<HTMLInputElement>) => {
      if(event.key !== 'Enter') return; // Enter 치면 로그인 클릭 이벤트 발생
      onSignInButtonClickHandler();
    }

    // render: sign in card 컴포넌트 렌더링 
    return (
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
            <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} setValue={setEmail} onKeyDown={onEmailKeyDownHandler}/>
            <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} setValue={setPassword} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler}/>
          </div>
          <div className='auth-card-bottom'>
            <div className='auth-signin-error-box'>
              <div className='auth-signin-error-message'>
                {'이메일 주소 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.'}
              </div>
            </div>
            <div className='black-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
            <div className='auth-description-box'>
              <div className='auth-description'>{'신규 사용자이신가요? '}<span className='auth-description-link'>{'회원가입'} </span></div>
            </div>
          </div>
        </div>
      </div>
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
