import React from 'react';
import Card from '../components/diary/Card';
import { getCardData } from '../lib/api';
import { withRouter } from 'react-router-dom';

const Diary = ({
    year,
    month,
    match,
    rawData,
    setRawData,
    userData,
    setUserData,
}) => {
    const id = match.params.id;
    const [diaryData, setDiaryData] = React.useState(null);
    // eventloop 에 넣어두고, 비동기 처리방식 공부하기.

    React.useEffect(() => {
        (async () => {
            const data = await getCardData();
            data[year] &&
                setDiaryData(
                    data[year][month].find((el) => el.id === parseInt(id))
                );
        })();
    }, [id]);

    return (
        diaryData && (
            <Card
                data={diaryData}
                year={year}
                month={month}
                rawData={rawData}
                setRawData={setRawData}
                setUserData={setUserData}
                id={id}
            />
        )
    );
};

export default withRouter(Diary);
