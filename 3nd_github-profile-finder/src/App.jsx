import { useEffect, useState } from 'react';
import Card from './components/card';
// import Hello from './components/hello';
import Search from './components/search';
import { getUserData } from './lib/api';
import styled from 'styled-components';
import GlobalStyle from './common/globalStyle';
import Result from './components/result';

function App() {
    // const [userId, setUserId] = useState(null);
    const [userState, setUserState] = useState({
        // 처음에는 data만 저장했지만, status도 함께 저장합니다
        status: 'idle',
        data: null,
    });
    console.log(userData);
    // const getUser = async (name) => {
    //   const data = await getUserData(name);
    //   setUserData(data);
    //   // 왜 api 에서 이미 async await 로 불러왔는데 여기서도 async await 를 써야할까?
    // }
    const getUser = async (name) => {
        setUserState({ ...userState, status: 'pending' }); // 아직 데이터를 불러오기 전이므로 상태를 pending으로 바꿉니다.
        // ... 는 Spread 연산자로서, 객체의 property를 오버라이딩(업데이트)합니다
        // status와 같이 이미 존재하는 property값을 수정한 경우, 이를 제외한 나머지 property들(data)이 그대로 반환되며,
        // 기존에 없던 property를 작성한 경우, 객체에 새로 추가됩니다.
        try {
            const data = await getUserData(name);
            if (data === null) throw Error; // API 요청에 실패한 경우에는 data에 null이 반환됩니다
            setUserState({ status: 'resolved', data: data });
        } catch (e) {
            setUserState({ status: 'rejected', data: null });
            console.log(e);
        }
    };

    function onSearch(id) {
        getUser(id);
    }

    return (
        <Container>
            <GlobalStyle />
            <p className="title">GitHub Profile Finder</p>
            <Search onSearch={onSearch} />
            <Result userState={userState} setUserState={setUserState} />
            {/* <Card userData ={userData}/> */}
        </Container>
    );
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #349eeb;
    weight: 100%;
    flex: 1;
    height: 100vh;

    .title {
        color: white;
        font-size: 32px;
    }
`;

export default App;
