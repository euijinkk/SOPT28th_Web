import React from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import CardHeader from './CardHeader';
import CardInfo from './CardInfo';
import { createCardData } from '../../lib/api';
import { useRecoilState } from 'recoil';
import { isReadOnly } from '../../state';

const CardWrap = Styled.div`
  width: 785px;
  height: 600px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  background-color: beige;
  border-radius: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    width: 642px;
    height: 219px;
    background-color: #EFEFEF;
    font-size: 18px;
    resize: none;
    font-family: Roboto;
    border: none;
    padding: 14px;
    box-sizing: border-box;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #C4C4C4;
    }
  }
`;

const Card = ({
    data,
    match,
    rawData,
    setRawData,
    year,
    month,
    setUserData,
    history,
    id,
}) => {
    // const isReadOnly = match.path === '/diary/:id' ? true : false;
    const [isRead, setIsRead] = useRecoilState(isReadOnly);
    const [state, setState] = React.useState(data);
    // React.useEffect(setIsReadOnly(true), []);
    // React.useEffect(() => {match.path === 'diary/edit/:id' ? setIsRead(false) : setIsRead(true)});
    // React.useEffect(()=>{
    //   console.log(isReadOnly);
    // }, [isReadOnly]);
   const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    }; 
    id = parseInt(match.params.id); // 현재 카드의 index 번호

    const handleEdit = async () => {
        const index = rawData[year][month].findIndex((data) => data.id === id);
        rawData[year][month][index] = state;
        const data2 = await createCardData(rawData);
        setRawData(data2);
        data2[year] && setUserData(data2[year][month]);
        history.goBack();
        setIsRead(true);
    };

    const handleDelete = async () => {
        const filteredList = rawData[year][month].filter(
            (data) => data.id !== id
        );
        rawData[year][month] = filteredList;
        const data2 = await createCardData(rawData);
        setRawData(data2);
        console.log(setUserData);
        data2[year] && setUserData(data2[year][month]);
        history.goBack();
    };

    return (
        <CardWrap>
            <CardHeader
                title={state.title}
                handleChange={handleChange}
                handleDelete={handleDelete}
                id={id}
                handleEdit={handleEdit}
            />
            <CardInfo
                data={state}
                handleChange={handleChange}
                id={id}
                setRawData={setRawData}
                year={year}
                month={month}
                setUserData={setUserData}
                rawData={rawData}
            />
            <textarea
                placeholder="오늘을 기록해 주세요"
                readOnly={isRead}
                value={state.text}
                name="text"
                onChange={handleChange}
            />
        </CardWrap>
    );
};

export default withRouter(Card);
