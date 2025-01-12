import { create } from "zustand";

// board 정보가 들어감
interface BoardStore {
    title: string;
    content: string;
    boardImageFileList: File[];

    setTItle: (title: string) => void;
    setContent: (content: string) => void;
    setBoardImageFileList: (boardImageFileList: File[]) => void;
    resetBoard: () => void;
}

const useBoardStore = create<BoardStore>(set => ({
    title: '',
    content: '',
    boardImageFileList: [],

    setTItle: (title) => set(state => ({...state, title})),
    setContent: (content) => set(state => ({...state, content})),
    setBoardImageFileList: (boardImageFileList) => set(state => ({...state, boardImageFileList})),
    resetBoard: () => set(state => ({...state, title: '', content: '', boardImageFileList: []})) 
}));

export default useBoardStore;