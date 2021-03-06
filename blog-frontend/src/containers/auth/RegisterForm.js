import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeField, initializeForm, register} from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { withRouter} from 'react-router-dom';


const RegisterForm = ({history}) => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const {form,auth,authError,user} = useSelector(({auth, user})=>({
        form:auth.register,
        auth:auth.auth,
        authError:auth.authError,
        user:user.user
    }));

    //인풋 변경 핸들러
    const onChange = e => {
        const {value, name} = e.target;
        dispatch(
            changeField({
                form:'register',
                key:name,
                value
            })
        );
    };

    //폼 등록 이벤트 핸들러
    const onSubmit = e => {
        e.preventDefault();
        const {username, password, passwordConfirm} = form;
        
        //빈 칸 존재 시
        if([username, password, passwordConfirm].includes('')){
            setError('빈 칸 입력 필요');
            return;
        }

        //비밀번호 불일치
        if(password !== passwordConfirm){
            setError('비밀번호 불일치');
            dispatch(changeField({form:'register', key:'password', value:''}));
            dispatch(changeField({form:'register', key:'passwordConfirm', value:''}));
            return;
        }

        dispatch(register({username,password}));
    };
    

    //컴포넌트 최초 렌더링 시 form 초기화
    useEffect(()=>{
        dispatch(initializeForm('register'));
    },[dispatch]);


    //회원가입 성공/실패 처리
    useEffect(()=>{
        if(authError){
            if(authError.response.status === 409){
                setError('이미 존재하는 계정입니다');
                return;
            }
            //기타
            setError('회원가입 실패');
            return;
        }

        if(auth){
            console.log('회원가입 성공');
            console.log(auth);
            dispatch(check());
        }
    },[auth,authError,dispatch]);

    //user 값이 잘 설정되었는지 확인
    useEffect(()=>{
        if(user){
           history.push('/'); //홈 이동
           try{
            localStorage.setItem('user',JSON.stringify(user));
           }catch(e){
            console.log('localStorage is not working');
           }
        }
    },[history,user]);
    
    return(
        <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error}/>
    );
};

export default withRouter(RegisterForm);