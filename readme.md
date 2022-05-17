## Needed technologies to run the repository:
    * Node
    * MongoDB

## How to run the project
    * clone the repository
    * move to the directory on your local machine using `cd backend-test-task`
    * install dependencies using `npm install`
    * run the project using `npm start`

## How it works

    * The user can register as a buyer or a seller by defining the body of **the post request to the endpoint: /api/auth/register** like:
        The body: `{
            username: "test",
            password: "test",
            userType: 'seller' OR "buyer"
        }`
    The user gets back a token if the user does not already exist or something went wrong. Example:
        `{
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
        }`

    * The user can login using a **post request to the endpoint /api/auth/login** and adding a body containing the username and the password. Example:
        The body: `{
            "username": "test",
            "password": "test"
        }`
    If something went wrong the user receives a message defining the problem otherwise the user gets back a token . Example: 
        `{
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX..."
        }`
    
    * A seller can add a catalog using a **post request to the endpoint /api/seller/create-catalog** , and can only add one catalog. The user needs to add a body containing items of the catalog. Also the user is obligated to add a token either in the body or the headers (x-access-token) or add it as a parameter. Example of the body:
        `{
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
            "products": [
                {
                    "name": "shoes",
                    "price": 50
                },
                {
                    "name": "hat",
                    "price": 75
                }
            ]
        }`
    The user should get back something like this:
        `{
            "catalog": {
                "seller": "6283ef224d32ac17feed6a42",
                "products": [
                    "62841825724b2ce31cfad960",
                    "62841825724b2ce31cfad961"
                ],
                "_id": "62841825724b2ce31cfad963",
                "__v": 0
            }
        }`

    * A buyer can get a list of all the sellers using a **get request to the end point  /api/buyer/list-of-sellers** , the user needs to provide a token and should receive something like this:
        `[
            {
                "id": "6283ef224d32ac17feed6a42",
                "username": "test1"
            }
        ]`

    * A buyer can get the catalog of a special seller by providing the seller's id in the parameters and a token using a **get request to the endpoint /api/buyer/seller-catalog/:seller_id** and receive something like:
        `{
            "catalog": {
                "_id": "62841825724b2ce31cfad963",
                "seller": "6283ef224d32ac17feed6a42",
                "products": [
                    {
                        "_id": "62841825724b2ce31cfad960",
                        "name": "shoes",
                        "price": 50,
                        "__v": 0
                    },
                    {
                        "_id": "62841825724b2ce31cfad961",
                        "name": "hat",
                        "price": 75,
                        "__v": 0
                    }
                ],
                "__v": 0
            }
        }`

    * A buyer can create a order to a list of products in a seller catalog using a **post request to the endpoint /api/buyer/create-order/:seller_id** and needs to provide the token and products ids. Example:
        `{
            "products": [
                "62841825724b2ce31cfad960",
                "62841825724b2ce31cfad961"
            ],
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6I..."
        }`
    And gets back something like:
        `{
            "_id": "62841b4f724b2ce31cfad96f",
            "buyer": "6283edf94d32ac17feed6a3e",
            "seller": "6283ef224d32ac17feed6a42",
            "products": [
                {
                    "_id": "62841825724b2ce31cfad960",
                    "name": "shoes",
                    "price": 50,
                    "__v": 0
                },
                {
                    "_id": "62841825724b2ce31cfad961",
                    "name": "hat",
                    "price": 75,
                    "__v": 0
                }
            ],
            "__v": 0
        }`

    * A seller can get all the orders he/she receives using a **get request to the endpoint /api/seller/orders** And needs to provide a token, and gets back something like:
     `{
        "orders": [
                {
                    "_id": "62841b4f724b2ce31cfad96f",
                    "buyer": {
                        "_id": "6283edf94d32ac17feed6a3e",
                        "username": "test",
                        "password": "$2b$10$EejR/Wm6ic5j4z7lqoyKDe5S4GAi5St/UCFSNNVCwWO5zQQaBD/3u",
                        "userType": "buyer",
                        "__v": 0
                    },
                    "seller": "6283ef224d32ac17feed6a42",
                    "products": [
                        {
                            "_id": "62841825724b2ce31cfad960",
                            "name": "shoes",
                            "price": 50,
                            "__v": 0
                        },
                        {
                            "_id": "62841825724b2ce31cfad961",
                            "name": "hat",
                            "price": 75,
                            "__v": 0
                        }
                    ],
                    "__v": 0
                }
            ]
      `}