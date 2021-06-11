import React, { useRef, useState } from 'react';
import Styled from 'styled-components';
import EmptyImage from '../../assets/Image.svg';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Select from '../../assets/Select.svg';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { isReadOnly, tagState } from '../../state';
import { createCardData } from '../../lib/api';

const getDateFormat = (date) => {
    const year = parseInt(date / 10000);
    const month = parseInt((date % 10000) / 100);
    const day = date % 100;
    return `${year}년 ${month}월 ${day}일`;
};

const CardInfo = ({
    data,
    handleChange,
    id,
    rawData,
    setRawData,
    year,
    month,
    setUserData,
}) => {
    const [isRead, setIsRead] = useRecoilState(isReadOnly);
    const classes = useStyles();
    const { image, date, weather, tags, summary } = data;
    const [hashtags, setHashtags] = useRecoilState(tagState);
    const inputRef = useRef(null);
    const [newTags, setNewTags] = useState(tags);
    // useResetRecoilState(hashtags);
    const handleSubmit = async (event) => {
        event.preventDefault();
        // 왜 새로고침 되는 것일까? -> focus도 안되군 ㅠ
        inputRef.current.focus();
        // focusInputRef();
        // const tempTag = hashtags.push(inputRef.current.value);
        console.log([...hashtags, inputRef.current.value]);
        const a = [...hashtags, inputRef.current.value];
        setHashtags(a);
        inputRef.current.value = '';
        console.log(hashtags);
        setNewTags(tags.concat(a));
        const b = tags.concat(a);
        rawData[year][month][id - 1].tags = b;
        console.log(rawData[year][month][id - 1].tags);
        console.log(newTags);
        const data2 = await createCardData(rawData);
        data2 && data2[year] && setUserData(data2[year][month]);
        setHashtags([]);
    };

    // const focusInputRef = () => {
    //   console.log(inputRef.current)
    //   inputRef.current.focus();
    // }

    
    React.useEffect(() => {
        console.log(hashtags);
    });

    return (
        <CardInfoWrap>
            <div className="info__photo">
                <img
                    src={image ? image : EmptyImage}
                    width={image && '210px'}
                    height={image && '210px'}
                    alt=""
                />
            </div>
            <div className="info__data-wrap">
                <p className="info__date">
                    <span>날짜</span>
                    {getDateFormat(date)}
                </p>
                <span>날씨</span>

                {isRead ? (
                    <input
                        type="text"
                        readOnly={isRead}
                        value={weather}
                        placeholder="날씨를 선택해주세요"
                    />
                ) : (
                    <FormControl>
                        <NativeSelect
                            className={classes.select}
                            value={weather}
                            name="weather"
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <option value="" disabled>
                                날씨를 선택해주세요
                            </option>
                            <option value={'맑음'}>맑음</option>
                            <option value={'구름'}>구름</option>
                            <option value={'흐림'}>흐림</option>
                            <option value={'비'}>비</option>
                            <option value={'눈'}>눈</option>
                            <option value={'바람'}>바람</option>
                        </NativeSelect>
                    </FormControl>
                )}
                <div className="info__tags">
                    <span className="tagSpan">태그</span>
                    {isRead ? (
                        tags && tags.length > 0 ? (
                            <div className="tagContainer">
                                {tags.map((tag, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="info__tags--tag"
                                        >
                                            {tag}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <input
                                type="text"
                                readOnly={isRead}
                                value=""
                                placeholder="태그를 선택해주세요"
                            />
                        )
                    ) : (
                        <div className="tagContainer">
                            {newTags &&
                                newTags.map((hashtag, index) => (
                                    <span
                                        className="info__tags--tag"
                                        key={index}
                                    >
                                        {hashtag}
                                    </span>
                                ))}
                            <form onSubmit={(event) => handleSubmit(event)}>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    readOnly={isRead}
                                    // value=""
                                    placeholder="태그를 선택해주세요3"
                                />
                            </form>
                        </div>
                    )}
                </div>
                <span>한 줄 요약</span>
                <input
                    className="info__summary"
                    type="text"
                    name="summary"
                    placeholder="입력해 주세요"
                    value={summary}
                    onChange={handleChange}
                    readOnly={isRead}
                    style={{
                        backgroundColor: isReadOnly ? 'white' : '#EFEFEF',
                    }}
                />
            </div>
        </CardInfoWrap>
    );
};

export default CardInfo;

const useStyles = makeStyles({
    select: {
        '& .MuiSvgIcon-root': {
            display: 'none',
        },
    },
});

const BootstrapInput = withStyles((theme) => ({
    input: {
        borderRadius: 5,
        position: 'relative',
        backgroundColor: 'white',
        border: '1px solid #CEA0E3',
        fontSize: 18,
        padding: '5px 7px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        background: `url(${Select}) no-repeat 95% 50%`,
        '&:focus': {
            borderRadius: 5,
            borderColor: '#CEA0E3',
            backgroundColor: 'white',
            boxShadow: '0 0 0 0.2rem rgba(206,160,227,.25)',
        },
    },
}))(InputBase);

const CardInfoWrap = Styled.div`
display: flex;
width: 642px;
margin: 19px auto;
font-size: 18px;

.tagSpan{
  width: 82px;
}
.tagContainer{
  display:flex;
  flex-wrap:wrap;
  flex:1;
}
.info {
  &__photo {
    width: 210px;
    height: 210px;
    background-color: #C4C4C4;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__data-wrap {
    margin-left: 50px;
  }
  &__date {
    margin: 15px auto 25px auto;
  }
  &__tags {
    display: flex;
    margin: 21px 0 24px 0;
    &--tag {
      font-size: 14px;
      color: white;
      background-color: #CEA0E3;
      padding: 4px 11px;
      margin-right: 7px;
      margin-bottom:7px;
      border-radius: 5px;
      max-width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: auto;
    }
  }
  &__summary {
    width: 236px;
    height: 30px;
    box-sizing: border-box;
    border: none;
    padding: 2px;
    font-size: 18px;
  }
}
span {
  display: inline-block;
  font-weight: bold;
  width: 82px;
  padding-right: 18px;
}
input {
  border: none;
  font-size: 18px;
  padding: 0;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #C4C4C4;
  }
}
`;
