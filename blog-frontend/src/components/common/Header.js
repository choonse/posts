import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import {Link} from 'react-router-dom';

const HeaderBlock = styled.div`
    position:fixed;
    width:100%;
    background:white;
    box-shadow:0px 2px 4px rgba(0,0,0,0.08);
`;

/* Responsive 컴포넌트 속성에 스타일 추가하여 새 컴포넌트 생성 */

const Wrapper = styled(Responsive)`
    height:4rem;
    display:flex;
    align-items:center;
    width:90%;
    //justify-content:space-between; /* 자식 엘리먼트 사이 여백 최대 설정 */
    position:absolute;
        left:0;
        top:0;
        bottom:0;
        right:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
    .logo{
        font-size:1.5rem;
        font-weight:800;
        letter-spacing:2px;
    }
    .right{
        display:flex;
        align-items:center;
        position:absolute;
        right: 0;
    }
`;

/* 헤더 fix이므로 페이지 콘텐츠가 4rem 아래 나타나도록 설정 */

const Spacer = styled.div`
    height:5rem;
`;


const UserInfo = styled.div`
    font-weight:800;
    margin-right:1rem;
    color:green;
`;


const Header = ({user, onLogout}) => {
    return(
        <>
        <HeaderBlock>
            <Wrapper>         
                
                <Link to="/" className="logo">VEGAN KOREA</Link>
              
                
                {user? (
                <div className="right">
                    <UserInfo>{user.username} 님</UserInfo>
                <Button onClick={onLogout}>로그아웃</Button>
                </div>
                ):(
                <div className="right">
                <Button to="/login">로그인</Button>
                </div>
                )}
            </Wrapper>
        </HeaderBlock>
        <Spacer />
        </>
    )
}

export default Header;