import { atom } from "recoil";

const userData = atom({
    key: "userState",
    default: {
        status: 'idle',
        data:null,
        repos:null,
    }
})

export {userData};