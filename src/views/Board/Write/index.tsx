import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import { useBoardStore, useLoginUserStore } from '@src/stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from '@src/constants';
import { useCookies } from 'react-cookie';

// component: 게시물 작성 화면 컴포넌트
export default function BoardWrite() {

  // state: 제목 영역 요소 참조 상태(ref) 
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  // state: 본문 영역 요소 참조 상태(ref) 
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  // state: 이미지 입력 요소 참조 상태 
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  // state: 게시물 상태(Board Store)
  const {title, setTitle} = useBoardStore();
  const {content, setContent} = useBoardStore();
  const {boardImageFileList, setBoardImageFileList} = useBoardStore();
  const {resetBoard} = useBoardStore();

  // state: 쿠키 상태 
  const [cookies, setCookies] = useCookies();

  // state: 게시물 이미지 미리보기 URL 상태
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  // function: 네비게이트 함수 
  const navigate = useNavigate();

  // event handler: 제목 변경 이벤트 처리 
  const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = event.target;
    setTitle(value);

    // 스크롤이 안생기도록하기 (scrollHeight 만큼 px을 잡아서 가라!)
    if(!titleRef.current) return;
    titleRef.current.style.height = 'auto';
    titleRef.current.style.height = `${titleRef.current.scrollHeight}px`
  }
  // event handler: 내용 변경 이벤트 처리 
  const onContentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = event.target;
    setContent(value);
    
    // 스크롤이 안생기도록하기 (scrollHeight 만큼 px을 잡아서 가라!)
    if(!contentRef.current) return;
    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`
  }
  // event handler: 이미지 변경 이벤트 처리 
  const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // files가 존재하지 않거나 길이가 0 이면 return
    // files 객체를 통해 file을 가져올 수 있음
    if(!event.target.files || !event.target.files.length) return;
    const file = event.target.files[0];
    // 미리보기용 Url 꺼내오기 + 보여주기기
    const imageUrl = URL.createObjectURL(file);
    const newImageUrls = imageUrls.map(item => item);
    newImageUrls.push(imageUrl);
    setImageUrls(newImageUrls);

    // 업로드를 위한 세팅팅
    const newBoardImageFileList = boardImageFileList.map(item => item);
    newBoardImageFileList.push(file);
    setBoardImageFileList(newBoardImageFileList);
  }

  // ====================== 클릭 이벤트 처리 =====================
  // event handler: 이미지 업로드 버튼 클릭 이벤트 처리 
  const onImageUploadButtonClickHandler = () => {
    // 이미지가 없으면 return / imageInputRef 참조 요소의 type이 file이기 때문에 클릭 이벤트 발생시 파일 업로드 창이 뜸
    if(!imageInputRef.current) return;
    // 존재하는 경우 클릭 이벤트 발생
    imageInputRef.current.click();
  }
  // event handler: 이미지 닫기 버튼 클릭 이벤트 처리 
  const onImageCloseButtonClickHandler = (deleteIndex: number) => {
    // imageInputRef.current에 type="file" 요소가 존재하는지 확인
    if(!imageInputRef.current) return;
    imageInputRef.current.value = ''; // input 값 초기화(같은 파일 중복 업로드로 인식하지 않게 하기 위함)

    /**
     * 업로드된 이미지 URL 제거 
     * imageUrls : 미리보기용으로 저장된 이미지 URL 리스트
     * filter() : deleteIndex에 해당하는 URL을 제외한 새로운 배열 생성(삭제) */ 
    const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
    setImageUrls(newImageUrls);

    // 실제로 업로드한 파일 객체 리스트(boardImageFileList)에서도 삭제
    const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
    setBoardImageFileList(newBoardImageFileList);
  }
  
  // effect: 마운트 실행 함수 
  useEffect(() => {
    const accessToken = cookies.accessToken;
    if(!accessToken) {  // 로그인이 안되어있으면 메인 화면으로
      navigate(MAIN_PATH());
      return; 
    }
    resetBoard();
  }, []);

  // render: 게시물 작성 화면 렌더링
  return (
    <div id='board-write-wrapper'>
      <div className='board-write-container'>
        <div className='board-write-box'>
          <div className='board-write-title-box'>
            <textarea className='board-write-title-textarea' ref={titleRef} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler}/>
          </div>
          <div className='divider'></div>
          <div className='board-write-content-box'>
            <textarea className='board-write-content-textarea' ref={contentRef} placeholder='본문을 작성해주세요.' value={content} onChange={onContentChangeHandler}/>
            <div className='icon-button' onClick={onImageUploadButtonClickHandler}>
              <div className='icon image-box-light-icon'></div>
            </div>
            <input ref={imageInputRef} type='file' accept='image/*' style={{display:'none'}} onChange={onImageChangeHandler}/> {/* accept : 지정한 파일만 올릴 수 있음 */}
          </div>
          <div className='board-write-images-box'>
            {imageUrls.map((imageUrl,index) => 
              <div className='board-write-image-box'>
                <img className='board-write-image' src={imageUrl}/>
                <div className='icon-button image-close' onClick={() => onImageCloseButtonClickHandler(index)}>
                  <div className='icon close-icon'></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
