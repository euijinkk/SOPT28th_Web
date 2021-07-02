import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { userData } from '../state';
import { IRepos } from '../types';

const Card = () => {
    const [userState, setUserState] = useRecoilState(userData);
    const { data, repos } = userState; // 구조분해할당을 통해 status와 data를 따로 가져옵니다
    const reposContainer = useRef<HTMLDivElement | null>(null);
    const repoModal = useRef<HTMLDivElement | null>(null);

    const closeCard = () => {
        setUserState({ ...userState, status: 'idle' });
    };
    const popUpModal = () => {
        repoModal.current && (repoModal.current.style.visibility = 'visible');

        repoModal.current?.classList.remove('hidden');
        repoModal.current?.classList.add('visible');
    };
    const hideModal = () => {
        repoModal.current && (repoModal.current.style.visibility = 'hidden');
        repoModal.current?.classList.remove('visible');
        repoModal.current?.classList.add('hidden');
    };
    return (
        data && (
            <Container>
                <button className="closeBtn" onClick={closeCard}>
                    X
                </button>
                <img src={data.avatar_url} alt="" />
                <p className="login">{data.login}</p>
                <p className="bio">{data.bio}</p>
                <a className="link" href={data.html_url} target="_blank">
                    Visit GitHub
                </a>
                <div className="metaData">
                    <div className="followers box">
                        <p className="box__text">Followers</p>
                        <p className="box__num">{data.followers}</p>
                    </div>
                    <div className="following box">
                        <p className="box__text">Following</p>
                        <p className="box__num">{data.following}</p>
                    </div>
                    <div
                        className="repos box"
                        ref={reposContainer}
                        onClick={popUpModal}
                    >
                        <p className="box__text">Repos</p>
                        <p className="box__num">{data.public_repos}</p>
                    </div>
                    <div className="repo--modal hidden" ref={repoModal}>
                        <div className="overlay" onClick={hideModal}></div>
                        <div className="modal__text">
                            Click repository Links
                            {repos &&
                                repos
                                    .slice(0, 10)
                                    .map((repo: IRepos, index: number) => (
                                        <a
                                            key={repo.id}
                                            href={repo.html_url}
                                            target="_blank"
                                        >
                                            <tr>
                                                <td>{index + 1} -&nbsp;</td>
                                                <td> {repo.name}</td>
                                            </tr>
                                        </a>
                                    ))}
                        </div>
                    </div>
                </div>
            </Container>
        )
    );
};

const Container = styled.section`
    background-color: skyblue;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // padding: 0 20px;
    // padding-bottom: 10px;
    width: 398px;
    animation-name: comingDown;
    animation-duration: 1s;
    position: relative;

    @keyframes comingDown {
        from {
            transform: translateY(-10%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .closeBtn {
        background-color: transparent;
        position: absolute;
        top: 8px;
        right: 8px;
        color: white;
        font-size: 24px;
        cursor: pointer;
    }
    img {
        width: 200px;
        height: 200px;
        margin: 20px 0px;
        border-radius: 50%;
        border: 2px solid black;
        padding: 5px;
    }

    .login {
        font-size: 24px;
        font-weight: bold;
    }

    .bio {
        display: block;
        font-size: 20px;
        margin: 20px 0px;
        padding: 0px 20px;
        width: 100%;
        text-align: center;
    }
    .link {
        background-color: transparent;
        border: 2px solid yellow;
        border-radius: 4px;
        color: yellow;
        font-size: 20px;
        margin-bottom: 12px;
        cursor: pointer;
        padding: 6px;
        &:hover {
            background-color: yellow;
            color: black;
        }
    }

    .metaData {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .box {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 4px;
            background-color: #231e39;
            color: white;
            &:hover {
                transform: scale(1.07);
            }
            transition: transform 300ms ease-in;
            // flex-basis:33%;
            width: 130px;
            padding: 10px;
            .box__text {
                font-size: 20px;
            }
            .box__num {
                font-size: 20px;
            }
        }
        .repos {
            margin-right: 0px;
        }
    }
    .hidden {
        visibility: hidden;
    }
    .visible {
        /* background-color: black; */
        animation: popUp 300ms;
        & > .overlay {
            background-color: gray;
            opacity: 0.7;
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        & > .modal__text {
            background-color: skyblue;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            width: 300px;
            height: 250px;
        }
    }
    @keyframes popUp {
        from {
            opacity: 0;
            transform: translateY(60%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .repo--modal {
        position: fixed;
        /* left: 10px; */
        top: 30%;
        display: flex;
        flex-direction: column;
        font-size: 20px;

        a {
            font-size: 16px;
        }
    }
`;

export default Card;
