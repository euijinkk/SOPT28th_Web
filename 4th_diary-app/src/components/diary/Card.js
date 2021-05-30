import React from 'react';
import Styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import CardHeader from './CardHeader';
import CardInfo from './CardInfo';

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

const Card = ({ data, match }) => {
    const isReadOnly = match.path === '/diary/:id' ? true : false;
    const { title, date, image, weather, tags, summary, text } = data;
    const [state, setState] = React.useState(data);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <CardWrap>
            <CardHeader
                title={state.title}
                isReadOnly={isReadOnly}
                handleChange={handleChange}
            />
            <CardInfo
                data={state}
                isReadOnly={isReadOnly}
                handleChange={handleChange}
            />
            <textarea
                placeholder="오늘을 기록해 주세요"
                readOnly={isReadOnly}
                value={state.text}
                name="text"
                onChange={handleChange}
            />
        </CardWrap>
    );
};

export default withRouter(Card);
