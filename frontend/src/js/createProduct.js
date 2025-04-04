const createProduct = (e) => {
    e.preventDefault()
    let img_path = document.getElementById('img_path').value
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    let category = document.getElementById('category').value

    if(validateInput(name, price, category)) {
        let id = `${Math.floor(Math.random() * (2000 - 1 + 1)) + 1}`
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                name,
                price,
                category,
                img_path,
            })
        })
        .then(() => alert('Produto criado com sucesso!'))
        .catch((error) => console.error(error))

        //window.open('./src/index.html', '_self')
    }
}

const validateInput = (name, price, category) => {
    return (name.value !== '' && price.value !== '' && category.value !== '')
}
