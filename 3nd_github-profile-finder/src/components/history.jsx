import React, { useState } from 'react';
import styled from 'styled-components';

const History = ({ userState, setUserState }) => {
    const onHistoryClick = (e) => {
        // console.log(e.target.innerText);
        setUserState(JSON.parse(localStorage[e.target.innerText]));
    };

    const deleteHistory = (e) => {
        let historyDiv =
            e.target.parentNode.tagName === 'DIV'
                ? e.target.parentNode
                : e.target.parentNode.parentNode.tagName === 'DIV'
                ? e.target.parentNode.parentNode
                : e.target.parentNode.parentNode.parentNode;
        console.log(historyDiv.innerText);

        localStorage.removeItem(historyDiv.innerText);
    };

    // (e.target.parentNode.parentNode.tag ==="DIV" ? e.target.parentNode.parentNode )
    const rendering = () => {
        const result = [];
        for (let i = 0; i < localStorage.length; i++) {
            result.push(
                <div
                    key={
                        JSON.parse(localStorage.getItem(localStorage.key(i)))
                            .data.id
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
