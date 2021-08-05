import React from 'react';
import Pagination from '../../components/post/Pagination';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import posts from '../../modules/posts';

const PaginationContainer = ({ location, match}) => {
    const { lastPage, posts, loading } = useSelector(({posts, loading}) => ({
        lastPage:posts.lastPage,
        posts:posts.posts,
        loading:loading['posts/LIST_POSTS'],
    }));

    //포스트 데이터 없거나 로딩중이면 미표시
    if(!posts||loading) return null;
    const { username } = match.params;

    //page 없으면 기본값 1

    const { tag, page = 1 } = qs.parse(location.search, {
        ignoreQueryPrefix:true,
    });


    return(
        <Pagination tag={tag} username={username} page={parseInt(page, 10)} lastPage={lastPage} />
    );
};

export default withRouter(PaginationContainer);