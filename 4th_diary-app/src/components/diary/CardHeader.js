import React from 'react';
import { withRouter } from 'react-router';
import Styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { isReadOnly } from '../../state';

const CardHeaderWrap = Styled.div`
  display: flex;
  align-items: flex-end;
  width: 642px;
  height: 83px;
  border-bottom: 2px solid #CEA0E3;
  margin: 0 auto;
  padding-bottom: 10px;
  .header {
    &__title {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
      border: none;
      background: none;
      &::placeholder {
        color: #C4C4C4;
      }
      &:focus {
        outline: none;
      }
    }
    &__empty {
      flex: 1;
    }
    &__edit {
      color: #CEA0E3;
    }
  }
  button {
    border: none;
    background: none;
    font-size: 18px;
    font-weight: bold;
    padding: 0;
    width: 40px;
    text-align: center;
    margin-left: 7px;
  }
  button:hover {
    cursor: pointer;
  }
`;

const CardHeader = ({ title, handleChange, handleDelete, history, id, handleEdit }) => {
  const [isRead, setIsRead] = useRecoilState(isReadOnly);
  const onEdit = () => {
    setIsRead(false);
    history.push(`/diary/edit/${id}`);
    setIsRead(false);
  }
  React.useEffect(()=> {
    console.log(isRead);
  })
    return (
        <CardHeaderWrap>
            <input
                type="text"
                className="header__title"
                name="title"
                placeholder="제목을 입력해 주세요"
                value={title}
                readOnly={isRead}
                onChange={handleChange}
            />
            <div className="header__empty"></div>
            {isRead ? (
                <button
                    className="header__edit"
                    onClick={onEdit}
                >
                    수정
                </button>
            ) : (
                <button className="header__edit" onClick={handleEdit}>
                    완료
                </button>
            )}
            {isRead ? (
                <button className="header__delete" onClick={handleDelete}>
                    삭제
                </button>
            ) : (
                ''
            )}
        </CardHeaderWrap>
    );
};

export default withRouter(CardHeader);
