import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import { LOGIN_TYPE, LOGOUT_TYPE, SEND_MESSAGE_TYPE, CREATE_CHAT_TYPE } from './actionTypes'
import { addUserAction, removeUserAction, newMessageAction, initChatAction, startChatAction } from './actions'


function connect() {
  const socket = io('http://localhost:5000');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('users.login', (usernames) => {
      emit(addUserAction(usernames));
    });

    socket.on('initChat.true', (chat) => {
      emit(initChatAction(chat));
    });

    socket.on('private.chat', (chat) => {
        emit(startChatAction(chat));
    })

    socket.on('users.logout', ( usernames ) => {
      emit(removeUserAction( usernames ));
    });

    socket.on('messages.new', (message) => {
      emit(newMessageAction(message));
    });

    socket.on('disconnect', e => {
      // TODO: handle
    });

    socket.on('users.disconnect', (usernames) => {
        emit(addUserAction(usernames));
    })
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const { payload } = yield take(SEND_MESSAGE_TYPE);
    socket.emit('message', payload);
  }
}

function* create(socket) {
    while (true) {
        let { payload } = yield take(CREATE_CHAT_TYPE)
        socket.emit('private.message', payload);
      }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
  yield fork(create, socket);
}

function* flow() {
  while (true) {
    let { payload } = yield take(LOGIN_TYPE);
    const socket = yield call(connect);
    socket.emit('login', { username: payload });
    socket.emit('initChat')

    const task = yield fork(handleIO, socket);

    yield take(LOGOUT_TYPE);
    yield cancel(task);
    socket.emit('logout');
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
