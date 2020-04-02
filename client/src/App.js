import React from 'react';
import { useSelector } from 'react-redux'

import AuthPage from './pages/AuthPage/AuthPage'
import ChatPage from './pages/ChatPage/ChatPage'

const App = () => {

  const user = useSelector(state => state.usersReducer.username)

  if(user) {
    return (
      <ChatPage />
    )
  }

  return (
      <AuthPage />
    );
}

export default App;
