import { atom } from 'recoil';
import { IUserState } from '../types';

const userData = atom({
    key: 'userState',
    default: {
        status: 'idle',
        data: null,
        repos: null,
    } as IUserState,
});

export { userData };
