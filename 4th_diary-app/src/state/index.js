import { atom } from "recoil";

export const isReadOnly = atom({
    key: "isReadOnly",
    default:true
})

export const tagState = atom({
    key: "tagState",
    default:[],
})