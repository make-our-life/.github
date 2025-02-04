import axios from "axios";
import { SignUpRequestDto, SignInRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";
import { GetSignInUserResposeDto } from "./response/user";
import { PostBoardResponseDto } from "./response/board";
import { PostBoardRequestDto } from "./request/board";

const DOMAIN = 'http://localhost:4000'
const API_DOMAIN = `${DOMAIN}/api/v1`

const authorization = (accessToken: string) => {
    return { headers:{ Authorization: `Bearer ${accessToken}`}}
};

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requsetBody: SignInRequestDto) => {
    // axios라는 애는 http request를 보내는데 그 결과를 기다리지 않고 다음 동작으로 넘김
    // await을 통해 결과를 받고 보내도록 기다림
    const result = await axios.post(SIGN_IN_URL(), requsetBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async (requsetBody: SignUpRequestDto) => {
    const result = await axios.post(SIGN_UP_URL(), requsetBody)
        .then(response => {
            const responseBody: SignUpResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response.data) return null;   // response 데이터가 없으면 null 리턴
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
        return result;
}

// 게시글 작성
const POST_BOARD_URL = () => `${API_DOMAIN}/board`

export const postBoardRequest = async(requsetBody: PostBoardRequestDto, accessToken: string) => {
    const result = await axios.post(POST_BOARD_URL(), requsetBody, authorization(accessToken))
        .then(response => {
            const responseBody: PostBoardResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if(!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;

export const getSignInUserRequest = async (accessToken: string) => {
    const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
        .then(response  => {
            const responseBody: GetSignInUserResposeDto = response.data;
            return responseBody;
        }).catch(error => {
            if (!error.response) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}

// 파일 업로드 부분 제작
const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UNLOAD_URL = () => `${FILE_DOMAIN}/upload`
const multipartFormData = {headers: {'Content-Type': 'multipart/form-data'}};

export const fileUploadRequest = async (data: FormData) => {
    const result = await axios.post(FILE_UNLOAD_URL(), data, multipartFormData)
        .then(response => {
            const responseBody: string = response.data;
            return responseBody;
        }) 
        .catch(error => {
            return null;
        })
    return result;
}