import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Title = ({ history, location }) => {
    console.log(location.pathname);
    const title = location.pathname === '/' ? '이번 달 일기' : '오늘의 일기';

    return (
        <TitleWrap>
            <div className="title">{title}</div>
        </TitleWrap>
    );
};

const TitleWrap = styled.div`
    .title {
        width: 100%;
        height: 92px;
        font-size: 36px;
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
`;

export default withRouter(Title);
