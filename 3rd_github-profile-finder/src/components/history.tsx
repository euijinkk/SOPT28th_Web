import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userData } from '../state';

const History = () => {
    const [userState, setUserState] = useRecoilState(userData);
    const [userList, setUserList] = useState(0);

    useEffect(() => {
        userState.data &&
            localStorage.setItem(
                userState.data.login,
                JSON.stringify(userState)
            );
    }, [userState]);

    const onHistoryClick = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        const target = e.target as HTMLDivElement;
        setUserState(JSON.parse(localStorage[target.innerText]));
    };

    const deleteHistory = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const target = e.target as HTMLElement;
        console.log(target.parentElement);
        let historyDiv =
            target.parentElement?.tagName === 'DIV'
                ? target.parentElement
                : target.parentElement?.parentElement?.tagName === 'DIV'
                ? target.parentElement?.parentElement
                : target.parentElement?.parentElement?.parentElement;
        console.log(historyDiv?.innerText);

        historyDiv?.innerText && localStorage.removeItem(historyDiv?.innerText);
        setUserList((userList) => userList + 1);
    };

    // (e.target.parentNode.parentNode.tag ==="DIV" ? e.target.parentNode.parentNode )
    const rendering = () => {
        const result = [];
        for (let i = 0; i < localStorage.length; i++) {
            result.push(
                <div
                    key={
                        localStorage.key(i) !== null &&
                        localStorage.getItem(localStorage.key(i) || '[]') &&
                        JSON.parse(
                            localStorage.getItem(localStorage.key(i) || '[]') ||
                                '[]'
                        ).data.id
                    }
                    className="history"
                >
                    <div className="id" onClick={onHistoryClick}>
                        {localStorage.key(i)}
                    </div>
                    <button onClick={deleteHistory}>
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            );
        }
        return result;
    };
    return (
        <Container>
            <div className="history__text">History</div>
            {rendering()}
        </Container>
    );
};

const Container = styled.section`
    position: fixed;
    top: 20%;
    left: 10px;
    width: 140px;

    .history__text {
        font-size: 24px;
        color: white;
    }
    .history {
        display: flex;
        justify-content: space-between;
        margin-top: 8px;
        .id {
            cursor: pointer;
            /* margin-top: 8px; */
            margin-right: 5px;
            &:hover {
                color: blue;
            }
        }
        button {
            background-color: transparent;
            /* padding: 0px; */
        }
        svg {
            cursor: pointer;

            &:hover {
                color: red;
            }
        }
    }
`;

export default History;
