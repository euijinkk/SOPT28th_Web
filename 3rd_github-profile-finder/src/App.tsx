import { ReactElement, useEffect, useState } from "react";
import Search from "./components/search";
import { getUserData } from "./lib/api";
import styled from "styled-components";
import GlobalStyle from "./common/globalStyle";
import Result from "./components/result";
import { getUserRepos } from "./lib/repoApi";
import { useRecoilState } from "recoil";
import { userData } from "./state";
import { IUserData } from "./types";

function App(): ReactElement {
  const [userState, setUserState] = useRecoilState(userData);
  const getUser = async (name: string): Promise<void> => {
    // 이거 왜 void 로 선언하면 안되지?
    setUserState({ ...userState, status: "pending" });
    try {
      const data: IUserData | null = await getUserData(name);
      const repos = await getUserRepos(name);
      if (data === null) throw Error;
      setUserState({ status: "resolved", data: data, repos: repos });
    } catch (e) {
      setUserState({ status: "rejected", data: null, repos: null });
      console.log(e);
    }
  };

  const [isFirst, setIsFirst] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isFirst") === "false") return;
    setIsFirst(true);
    localStorage.setItem("isFirst", "false");
  }, []);

  return (
    <Container>
      {isFirst ? (
        <div>처음 방문하신 것은 환영합니다.</div>
      ) : (
        <div>다시 한번 방문해주셔서 감사합니다.</div>
      )}
      <GlobalStyle />
      <p className="title">GitHub Profile Finder</p>
      <Search getUser={getUser} />
      <Result />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #349eeb;
  width: 100%;
  flex: 1;
  height: 100%;

  .title {
    color: white;
    font-size: 32px;
  }
`;

export default App;
