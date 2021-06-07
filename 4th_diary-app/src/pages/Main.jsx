import React from 'react';
import Card from '../components/main/Card';
// import NewCard from '../components/main/NewCard';
import Styled from 'styled-components';
import { getCardData } from '../lib/api';
import NewCard from '../components/main/NewCard';
import { withRouter } from 'react-router-dom';

const MainWrap = Styled.div`
  display: grid;
  grid-template-columns: repeat(5, 227px);
  
  /* grid-template-columns:repeat(auto-fill, 250px); */
  column-gap: 25px;
  row-gap: 25px;
  width:100%;
  ${({ theme }) => theme.media.fiveCard`
    grid-template-columns:repeat(auto-fill, 220px);
  `}
`;

const Main = ({
    year,
    month,
    history,
    rawData,
    setRawData,
    userData,
    setUserData,
}) => {
    return (
        <MainWrap>
            {userData &&
                userData.map((data, index) => (
                    <Card
                        key={index}
                        props={data}
                        onClickFunc={() => history.push(`/diary/${data.id}`)}
                    />
                ))}
            <NewCard
                year={year}
                month={month}
                rawData={rawData}
                setUserData={setUserData}
                id={userData ? userData.length + 1 : 1}
            />
        </MainWrap>
    );
};

export default withRouter(Main);
