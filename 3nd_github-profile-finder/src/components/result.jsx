import React from 'react';
import Card from './card';

const Result = ({ userState, setUserState }) => {
    const { status, data } = userState; // 구조분해할당을 통해 status와 data를 따로 가져옵니다

    switch (
        status // status의 값에 따라 다른 컴포넌트를 불러옵니다
    ) {
        case 'pending': // 아직 Promise 결과가 도착하지 않은 경우
            return (
                <div style={{ color: 'white', fontSize: '24px' }}>
                    Loading...
                </div>
            );

        case 'resolved': // API 요청에 성공하여 데이터가 정상적으로 도착한 경우
            return <Card userData={data} setUserState={setUserState} />;

        case 'rejected': // API 요청에 실패한 경우
            return (
                <div style={{ color: 'white', fontSize: '24px' }}>
                    User Not Found
                </div>
            );

        case 'idle':
        default:
            return <div></div>;
    }
};

export default Result;
