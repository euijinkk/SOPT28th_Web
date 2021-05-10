import React, { useRef } from 'react';
import styled from 'styled-components';

const Search = ({ onSearch }) => {
    const inputForm = useRef();
    const getId = (event) => {
        event.preventDefault();
        console.log(inputForm.current.value);
        onSearch(inputForm.current.value);
        inputForm.current.value = '';
    };

    return (
        <Form onSubmit={getId}>
            <input
                ref={inputForm}
                type="text"
                placeholder="GitHub ID를 입력하세요."
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
