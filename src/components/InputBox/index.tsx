import {ChangeEvent, forwardRef, KeyboardEvent} from 'react'
import './style.css'

// interface: Input Box 컴포넌트 Properties
interface Props {
    // input 버튼은 type 구분 해야함
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    // setValue: Dispatch<SetStateAction<string>>; // state의 타입입
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean; // error 상태 구분

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon'; // 값이 없을 수도 있음
    onButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

// component: Input Box 컴포넌트 (forwardRef 로 input 버튼 컨트롤 : ref -> 엔터 클릭 시 input 커서서 넘기기)
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    
    // state: properties
    const { label, type, placeholder, value, error, icon, message } = props;
    const { onChange, onButtonClick, onKeyDown } = props;

    // event handler : input 값 변경 이벤트 처리 함수
    // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    //     const { value } = event.target;
    //     setValue(value);
    // }

    // event handler : input 키 이벤트 처리 함수
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }

    // render: Input Box 컴포넌트
    return (
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                <input className='input' ref={ref} type={type} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                {onButtonClick !== undefined && (
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && (<div className={`icon ${icon}`}></div>)}
                    </div>
                )}
                
            </div>
            {message !== undefined && (
                <div className='inputbox-message'>{message}</div>
            )}
        </div>
    )
})

export default InputBox;