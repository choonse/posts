import { createAction, handleActions} from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import { callExpression } from '../../../../AppData/Local/Microsoft/TypeScript/4.3/node_modules/@babel/types/lib/index';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, { createRequestActionTypes,} from '../lib/createRequestSaga';

import LoginForm from '../containers/auth/LoginForm';

const TEMP_SET_USER = 'user/TEMP_SET_USER'; //새로고침 후 임시 로그인 처리

const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK',
);

const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user=>user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);


function checkFailureSaga(){
    try{
        localStorage.removeItem('user'); //localStorage에서 user 제거
    }catch(e){
        console.log('localStorage is not working');
    }
}

function* logoutSaga(){
    try{
        yield call(authAPI.logout);
        localStorage.removeItem('user');
        
    }catch(e){
        console.log(e);
    }
}

export function* userSaga() {
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFailureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState={
    user:null,
    checkError:null,
};

export default handleActions({
    [TEMP_SET_USER]:(state,{payload:user}) =>({
        ...state,
        user,
    }),
    [CHECK_SUCCESS]:(state,{payload:user})=>({
        ...state,
        user,
        checkError:null,
    }),
    [CHECK_FAILURE]:(state,{payload:error})=>({
        ...state,
        user:null,
        checkError:error,
    }),
    [LOGOUT]: state => ({
        ...state,
        user:null,
    }),
},initialState,
);