import React, { useRef, useState } from 'react';
import styled from 'styled-components';

interface Props {
    getUser: (name: string) => Promise<void>;
}

const Search: React.FC<Props> = ({ getUser }) => {
    const [userName, setUserName] = useState('');
    // const inputForm = useRef();
    // const getId = (event) => {
    //     event.preventDefault();
    //     console.log(inputForm.current.value);
    //     onSearch(inputForm.current.value);
    //     // inputForm.current.value = '';
    // };
    const inputBox = useRef<HTMLInputElement | null>(null);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getUser(userName);
        setUserName('');
        console.log(inputBox.current?.value);
        inputBox.current && (inputBox.current.value = '');
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
