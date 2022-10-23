import axios from "axios"

const NODE_ENV = process.env.NODE_ENV;
let baseUrl = ''
console.log(NODE_ENV)

if (NODE_ENV == 'production') {
    console.log(NODE_ENV)
}

export default axios
