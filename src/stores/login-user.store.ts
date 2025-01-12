import { User } from "@src/types/interface";
import { create } from "zustand";

interface LoginUserStore {
    loginUser: User | null;
    setLoginUser: (loginUser: User) => void;
    resetLoginUser: () => void;   
};

/*
전역 상태 변수 만드는 방식
1. loginUser : null로 시작 - 로그인 되어있지 않은 상태
2. setLoginUser : 새로운 사용자 정보를 받아서 loginUser 상태 업데이트
3. resetLoginUser : loginUser 상태를 null로 설정하여 로그아웃 상태로 변경

zustand : 간단 효율적인 상태 관리 라이브러리
set : 스토어 상태 업데이트
*/
const useLoginUserStore = create<LoginUserStore>(set => ({
    loginUser: null,
    setLoginUser: (loginUser) => set(state => ({...state, loginUser})),
    resetLoginUser: () => set(state => ({ ...state, loginUser: null}))
}));   // create(zustand)

export default useLoginUserStore;