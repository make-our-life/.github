import latestBoardListMock from './mocks/latest-board-list.mock';
import React from 'react';
import BoardItem from './components/BoardItem';

function App() {

  return (
    <>
      {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem}/>)}
    </>
  )
}

export default App
