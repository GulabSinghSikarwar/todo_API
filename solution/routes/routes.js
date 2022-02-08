const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const router = express.Router();
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));



router.get('/todos', (req, resp, next) => {
    console.log("server started ");
    fetch('https://jsonplaceholder.typicode.com/todos').then((response) => {



        return response.json()

    }).then((data) => {

        const cust_data = [];
        data.forEach(element => {
            let user = {
                id: element.id,
                title: element.title,
                completed: element.completed

            }
            cust_data.push(user)

        });

        resp.status(200).json(
            cust_data
        )



    })
})

router.get('/user/:user_id', (req, resp, next) => {
    let id = req.params.user_id;
    id = parseInt(id)


    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((result) => {
        return result.json();

    }).then((user_data) => {




        fetch('https://jsonplaceholder.typicode.com/todos').then((all_todos_result) => {
            return all_todos_result.json()
        }).then((all_todos) => {
            let required_todos = [];

            all_todos.forEach(element => {

                if (element.userId === id) {
                    required_todos.push(element);


                }




            });

            let complete_info = {...user_data,

                todos: required_todos
            };
            resp.status(200).json(complete_info);




        })




    })
})
router.get('/', (req, resp, next) => {
    resp.status(200).json({
        base: "/"
    })

})

module.exports = router;