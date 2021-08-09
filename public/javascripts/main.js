async function sendQueryGraphQL(query, variables) {
    try {
        let r = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables 
            })
        })
        let {data} = await r.json()
        console.log(data)
        return data
    }
    catch(error) {
        console.error(error)
    }
}

async function getMessage() {
    let data = await sendQueryGraphQL('{message}')
    document.querySelector('h1').innerHTML = data.message
}

async function getProducts() {
    let data = await sendQueryGraphQL('{products}')
    document.querySelector('h1').innerHTML = data.message
}

function setListeners() {
    document.querySelector('form').addEventListener('submit', async e => {
        e.preventDefault()

        let title = document.querySelectorAll('input')[0].value
        let price = document.querySelectorAll('input')[1].value
        let thumbnail = document.querySelectorAll('input')[2].value
        document.querySelectorAll('input').forEach(input => {
            input.value = ''  
        })
        
        document.querySelectorAll('input')[1].value = ''
        document.querySelectorAll('input')[2].value = ''

        const product = {title, price, thumbnail}
        console.log(product)


        const query = `
        mutation createProduct($title: String!, $price: String!, $thumbnail: String!) {
            createProduct(title: $title, price: $price, thumbnail: $thumbnail) {
                ... productsFields
            }
        }
        fragment productsFields on Product {
            title
            price
            thumbnail
        }`
        const variables = product

        let rta = await sendQueryGraphQL(query,variables)
        return rta
    })

    document.querySelector('a').addEventListener('click', async e => {
        e.preventDefault()

        let data = await sendQueryGraphQL(`
        {
            products {
                title
                price
                thumbnail
            }
          }        
        `)
        //console.log(data)
        document.querySelector('pre').innerText = JSON.stringify(data.products,null,2)
    })
}

function start() {
    setListeners()
    getMessage()
}

start()