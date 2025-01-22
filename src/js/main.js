const products = document.querySelector('.items')
const cart = document.getElementById('cart-items')
const price = document.querySelector('.price')

const getProducts = () => {

    let products = []

    fetch('http://localhost:3000/products', {
        method: 'GET'
    })
    .then((data) => data.json())
    .then((data) => {
        console.log(data)

        products = data

        products.forEach((product) => {
          let col = document.createElement("div");
          let card = document.createElement("div");
          let image = document.createElement("img");
          let body = document.createElement("div");
          let text = document.createElement("p");
          let price = document.createElement("h6");
          let button = document.createElement("button");

          col.classList.add("col", "d-flex", "justify-content-center");
          card.classList.add("card", "align-items-center", "border-dark");
          image.classList.add("card-img-top", "img-fluid");
          body.classList.add("card-body");
          text.classList.add("card-text");
          price.classList.add("card-subtitle", "mb-3", "text-muted");
          button.classList.add("btn", "btn-dark");

          image.setAttribute("src", product.img_path);
          image.setAttribute("alt", product.name);

          text.innerText = product.name;
          
          price.innerText = `Price: $${product.price}`;

          // Adiciona os dados do produto como atributos data-*
          button.setAttribute("data-id", product.id); // Exemplo: ID do produto
          button.setAttribute("data-name", product.name); // Nome do produto
          button.setAttribute("data-price", product.price); // Preço do produto
          button.setAttribute("data-img", product.img_path); // Caminho da imagem do produto

          let icon = document.createElement("i");
          let textButton = document.createTextNode(" Comprar");

          icon.classList.add("bi", "bi-cart-plus");
          button.appendChild(icon);

          button.appendChild(textButton);

          button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            const productName = event.target.getAttribute("data-name");
            const productPrice = event.target.getAttribute("data-price");
            const productImg = event.target.getAttribute("data-img");

            addProductToCart(productId, productName, productPrice, productImg);      
          });

          body.appendChild(text);
          body.appendChild(price);
          body.appendChild(button);

          card.appendChild(image);
          card.appendChild(body);

          col.appendChild(card);

          let products_list = document.getElementById("products-list");
          products_list.appendChild(col);
        })
    })
    .catch((error) => {
        console.error(error)
    })
}
window.onload = () => getProducts()

function addProductToCart(id, name, price, img) {
    let valuePriceTotal = document.getElementById('price-total')
    let quanti_total = document.getElementById('quant-total')

    const childElements = Array.from(cart.children).filter(child => child.classList.contains('cart-item'));

    const elementExist = childElements.filter(child => child.getAttribute("data-id") === id)

    if(elementExist.length > 0) {
      const value = elementExist[0].children[2].innerHTML
       
      const newValue = Number(value) + 1

      elementExist[0].children[2].innerHTML = `${newValue}`

    } else {
      insertHTMLToCart(id, price, img)
    }

    let newvaluePriceTotal = Number(valuePriceTotal.innerText) + Number(price)
    valuePriceTotal.innerText = `${newvaluePriceTotal}`

    let newQuantTotal = Number(quanti_total.innerText) + 1
    quanti_total.innerText = `${newQuantTotal}`
}

function insertHTMLToCart(id, price, img) {
    let li = document.createElement('li')
    let image = document.createElement('img')
    let priceProduct = document.createElement('p')
    let quant = document.createElement('p')
    let priceTotal = document.getElementById('price')

    li.classList.add('dropdown-item', 'item', 'cart-item')

    li.setAttribute("data-id", id)

    image.classList.add('img-fluid')

    quant.innerText = `1`

    priceProduct.innerText = `$${price}`

    image.setAttribute('src', img)

    li.appendChild(image)
    li.appendChild(priceProduct)
    li.appendChild(quant)
    
    cart.insertBefore(li, priceTotal)
}