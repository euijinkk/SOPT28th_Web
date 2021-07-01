import { atom } from "recoil";

export const isReadOnly = atom({
    key: "isReadOnly",
    default:true
})

export const tagState = atom({
    key: "tagState",
    default:[],
})

export const userImgState = atom({
    key: "userImgState",
    default: null,
})