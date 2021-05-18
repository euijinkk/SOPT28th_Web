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
                        component={() => <Main year={year} month={month} />}
                    />
                    <Route path="/diary/:id" component={Diary} />
                    <Route component={() => <div>Fage Not Found</div>} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;
