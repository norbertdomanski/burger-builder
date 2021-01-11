import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-2b7fc-default-rtdb.firebaseio.com/'
})

export default instance