const createProduct = (e) => {
    e.preventDefault()
    let img_path = document.getElementById('img_path').value
    let name = document.getElementById('name').value
    let price = document.getElementById('price').value
    let category = document.getElementById('category').value

    if(validateInput) {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            body: JSON.stringify({
                id: '2',
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