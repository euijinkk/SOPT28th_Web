import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const Search = ({ getUser }) => {
    const [userName, setUserName] = useState('');
    // const inputForm = useRef();
    // const getId = (event) => {
    //     event.preventDefault();
    //     console.log(inputForm.current.value);
    //     onSearch(inputForm.current.value);
    //     // inputForm.current.value = '';
    // };
    const inputBox = useRef();
    const handleChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        getUser(userName);
        setUserName('');
        inputBox.current.value = '';
        // inputBox.current.focus();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="GitHub ID를 입력하세요."
                onChange={handleChange}
                ref={inputBox}
            />
        </Form>
    );
};

const Form = styled.form`
    input {
        width: 300px;
        height: 26px;
        border: 4px solid #231e39;
        margin-bottom: 10px;
    }
`;

export default Search;
