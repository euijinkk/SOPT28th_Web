import styled, { ThemeProvider } from 'styled-components';
import { useEffect, useState } from 'react';
import GlobalStyle from './components/common/globalstyle';
import MainHeader from './components/common/MainHeader';
import Main from './pages/Main';
import Title from './components/common/Title';
import Diary from './pages/Diary';
import Calendar from './components/common/Calendar';
import Footer from './components/common/Footer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import { getCardData } from './lib/api';
// import { getCardData } from './lib/api';

const getCurrentDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    return { year: currentYear, month: currentMonth };
};

function App() {
    const [year, setYear] = useState(getCurrentDate().year);
    const [month, setMonth] = useState(getCurrentDate().month);
    const [rawData, setRawData] = React.useState(null);
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            const data = await getCardData();
            setRawData(data);
            data && data[year] && setUserData(data[year][month]);
        })();
    }, [year, month]);

    return (
        <>
            <BrowserRouter>
                <MainHeader />
                <Calendar
                    year={year}
                    setYear={setYear}
                    month={month}
                    setMonth={setMonth}
                />
                <Title />
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={() => (
                            <Main
                                year={year}
                                month={month}
                                rawData={rawData}
                                setRawData={setRawData}
                                userData={userData}
                                setUserData={setUserData}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/diary/:id"
                        component={() => (
                            <Diary
                                year={year}
                                month={month}
                                rawData={rawData}
                                setRawData={setRawData}
                                userData={userData}
                                setUserData={setUserData}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/diary/edit/:id"
                        component={() => (
                            <Diary
                                year={year}
                                month={month}
                                rawData={rawData}
                                setRawData={setRawData}
                                userData={userData}
                                setUserData={setUserData}
                            />
                        )}
                    />
                    <Route component={() => <div>Fage Not Found</div>} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;
