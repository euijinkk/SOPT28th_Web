import React from 'react';
import Menu from '../../assets/Menu.svg';
import ProfileIcon from '../../assets/ProfileIcon.svg';
import styled from 'styled-components';

const MainHeaderWrap = styled.div`
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 91px;
        width: 100%;
        text-align: center;

        &__title {
            font-size: 36px;
            font-weight: bold;
            font-style: italic;
            color: #cea0e3;
            &:hover {
                cursor: pointer;
            }
        }

        &__profile {
            margin-right: 10px;
        }

        &__hr {
            width: 100%;
            height: 13px;
            background: linear-gradient(90deg, white, #cea0e3);
        }
    }
`;

const MainHeader = () => {
    return (
        <MainHeaderWrap>
            <div className="header">
                <img src={Menu} alt="" className="header__menu" />
                <div className="header__title">Diary App</div>
                <img src={ProfileIcon} alt="" className="header__profile" />
            </div>
            <div className="header__hr"></div>
        </MainHeaderWrap>
    );
};

export default MainHeader;
