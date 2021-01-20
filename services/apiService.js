import * as axios from 'axios'
const BASE_URL = 'https://jsonplaceholder.typicode.com'

export default {
    getUserDetails() {
        const url = `${BASE_URL}/users`
        return axios.get(url,  {
            'Content-Type': 'application/json'
        })
    }
}