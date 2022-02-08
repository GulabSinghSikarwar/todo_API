const express = require("express");
const app = express();

const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = require('./routes/routes')


// app.use((req, resp, next) => {
//     console.log("server started ");
//     fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {
//         return response.json()
//     }).then((data) => {
//         console.log(data);

//     })

// })
app.use(router)
app.listen('3000')