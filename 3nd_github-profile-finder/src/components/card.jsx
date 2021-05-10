import React, { useRef } from 'react';
import styled from 'styled-components';

const Card = ({ userData, setUserState }) => {
    // const closeBtn = useRef();
    const closeCard = () => {
        console.log(setUserState);
        setUserState({});
    };
    console.log(userData);
    return (
        userData && (
            <Container>
                <button className="closeBtn" onClick={closeCard}>
                    X
                </button>
                <img src={userData.avatar_url} alt="" />
                <p className="login">{userData.login}</p>
                <p className="bio">{userData.bio}</p>
                <a className="link" href={userData.html_url} target="_blank">
                    Visit GitHub
                </a>
                <div className="metaData">
                    <div className="followers box">
                        <p className="box__text">Followers</p>
                        <p className="box__num">{userData.followers}</p>
                    </div>
                    <div className="following box">
                        <p className="box__text">Following</p>
                        <p className="box__num">{userData.following}</p>
                    </div>
                    <div className="repos box">
                        <p className="box__text">Repos</p>
                        <p className="box__num">{userData.public_repos}</p>
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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-right: 4px;
            background-color: #231e39;
            color: white;
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
`;

export default Card;
