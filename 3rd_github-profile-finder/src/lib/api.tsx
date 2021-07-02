import axios from 'axios';
import { IUserData } from '../types';

/************* baseURL 사용하는 방식 **************/
/* const client = axios.create({
 *   baseURL: "https://api.github.com/users/",
 * });
 */

// api 요청은 비동기로 처리하므로 async, await을 사용합니다
// 함수 앞에 export를 바로 사용하면, import 할 때는 { getUserData }로 받아옵니다
export const getUserData = async (name: string): Promise<IUserData | null> => {
    // name은 깃허브 아이디
    try {
        // const { data } = await client.get(name); -> baseURL을 사용할 경우
        const { data }: { data: Promise<IUserData> } = await axios.get(
            'https://api.github.com/users/' + name
        );
        console.log('[SUCCESS] GET user data', data);
        return data;
    } catch (e) {
        console.log('[FAIL] GET user data', e);
        return null;
    }
};
