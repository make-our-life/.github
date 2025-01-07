import React from 'react';
import BoardItem from './components/BoardItem';
import top3BoardListMock from './mocks/top3-board-list.mock';
import Top3Item from './components/Top3Item';
import CommentItem from './components/CommentItem';
import commentListMock from './mocks/comment-list.mock';
import favoriteListMock from './mocks/favorite-list.mock';
import FavoriteItem from './components/FavoriteItem';


function App() {

  return (
    <>
      {/* 댓글글
      <div style={{padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem}/>)}
      </div> */}
      <div style={{display: 'flex', columnGap: '30px', rowGap: '20px'}}>
        {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem}/>)}
      </div>
    </>
  )
}

export default App
