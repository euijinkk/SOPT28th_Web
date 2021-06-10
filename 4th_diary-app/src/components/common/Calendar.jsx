import React, { useRef } from 'react';
import styled from 'styled-components';
import leftOff from '../../assets/leftOff.svg';
import rightOff from '../../assets/rightOff.svg';
import leftOn from '../../assets/leftOn.svg';
import rightOn from '../../assets/rightOn.svg';
import { useLocation } from 'react-router';

const Calendar = ({ year, month, setYear, setMonth }) => {
    const leftButton = useRef();
    const rightButton = useRef();
    const location = useLocation();
    const isMain = location.pathname === '/' ? true : false;
    const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return (
        <CalendarWrap>
            <div className="calendar">
                <div className="calendar__year">
                    <img
                        src={leftOff}
                        alt=""
                        className="calendar__year--left"
                        onClick={() => isMain && setYear(year - 1)}
                        ref={leftButton}
                        onMouseEnter={() =>
                            isMain && (leftButton.current.src = leftOn)
                        }
                        onMouseLeave={() =>
                            isMain && (leftButton.current.src = leftOff)
                        }
                    />
                    <div className="calendar__year--title">{year}년</div>

                    <img
                        src={rightOff}
                        alt=""
                        className="calendar__year--right"
                        onClick={() => isMain && setYear(year + 1)}
                        ref={rightButton}
                        onMouseEnter={() =>
                            isMain && (rightButton.current.src = rightOn)
                        }
                        onMouseLeave={() =>
                            isMain && (rightButton.current.src = rightOff)
                        } //
                    />
                </div>
                <div className="calendar__month">
                    {monthList.map((month2) => {
                        return (
                            <div
                                key={month2}
                                className="calendar__month--button"
                                onClick={() => isMain && setMonth(month2)}
                                style={
                                    month2 === month
                                        ? {
                                              fontSize: '22px',
                                              fontWeight: 'bold',
                                          }
                                        : {}
                                }
                            >
                                {month2 + 1}월
                            </div>
                        );
                    })}
                </div>
            </div>
        </CalendarWrap>
    );
};

// npm install json-server --save-dev
// npx json-server --watch data.json --port 3001

const CalendarWrap = styled.div`
    .calendar {
        width: 100%;
        height: 118px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__year {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: flex-end;
            height: 61px;

            &--left:hover,
            &--right:hover {
                cursor: pointer;
            }

            &--year {
                font-size: 36px;
                font-weight: bold;
                margin: 0 25px;
                line-height: 1;
            }
        }

        &__month {
            height: 57px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 90%;

            &--button {
                font-size: 18px;
                width: 52px;
                &:hover {
                    font-size: 22px;
                    font-weight: bold;
                    cursor: pointer;
                }
            }
        }
    }
`;

export default Calendar;
