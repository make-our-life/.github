import axios from "axios";
import { SignUpRequestDto, SignInRequestDto } from "./request/auth";
import { SignInResponseDto, SignUpResponseDto } from "./response/auth";
import { ResponseDto } from "./response";

const DOMAIN = 'http://localhost:4000'
const API_DOMAIN = `${DOMAIN}/api/v1`

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