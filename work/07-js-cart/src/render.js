import { PAGES } from './constants';

export default function render(state, appEl, cartEl) {



    if (state.page === PAGES.product) {
        renderCats(state, appEl);
        resetCart(cartEl);
    }

    if (state.page === PAGES.cart) {
        renderCats(state, appEl);
        renderCart(state, cartEl);
    }
}


function generateListHtml(state) {
    const listHtml = state.cats.map((cat, index) => {
        const doneClass = cat.done ? 'complete' : '';
        return `
    
    <li class="product-list">
     <label class="product">
        <img class="cat_logo" src="http://placekitten.com/150/150?image=${index + 1}" alt="picture of cute looking cat" />
        <span  data-index="${index}" class ="todo ${doneClass}"> ${cat.name} </span>
        <span  data-index="${index}" class ="price"> ${cat.price} </span>
    </label>

    <button
    data-index ="${index}" class = "add-to-cart" type ="button">
    Add to Cart
    </button>
   
  
   
    </li>
    `;

    }).join('');
    return listHtml;
}


function generateCartHtml(state) {
    const listHtml = state.cats.map((cat, index) => {
        if (cat.quantity > 0) {
            const doneClass = cat.done ? 'complete' : '';
            return `
    
    <li class="product-list">
     <label class="product">
        <img class="cat_logo" src="http://placekitten.com/150/150?image=${index + 1}" alt="picture of cute looking cat" />
        <span  data-index="${index}" class ="todo ${doneClass}"> ${cat.name} </span>
        <span  data-index="${index}" class ="quantity"> 
        <button
        data-index ="${index}" class = "remove-cart" type ="button">
        -
        </button>
        ${cat.quantity}
        <button
        data-index ="${index}" class = "add-cart" type ="button">
        +
        </button>
         </span>
        <span  data-index="${index}" class ="price"> $${cat.saleprice} </span>
    </label>

    </li>
    `;
        }

    }).join('');
    return listHtml;
}



function generateChangePageHtml(state) {


    return `


    <button type ="button" class ="page" data-target ="${PAGES.cart}">
    ${state.page === "product"
            ? `  View Cart
        ${state.totalquantity > 0
                ? ` (${state.totalquantity})`
                : ``
            }`
            : `Hide Cart`
        }
    
   
    </button>
    `;
}


function generateCheckoutPageHtml(state) {
    return `
    <p class="totalprice"> <span class="subtotal">Subtotal </span> : $${state.totalPrice}</p>
    <button type ="button" class ="checkout" data-target ="${PAGES.cart}">
    
  
    ${state.totalquantity > 0
            ? `Checkout`
            : ``
        }
    </button>
    `;
}
function renderCats(state, appEl) {


    const listHtml = generateListHtml(state);
    const changePageHtml = generateChangePageHtml(state);

    appEl.innerHTML = `
    <ul class="cats"> 
    ${listHtml}
    </ul>
    ${changePageHtml}
    `;
}




function renderCart(state, cartEl) {


    const listHtml = generateCartHtml(state);
    const changePageHtml = generateCheckoutPageHtml(state);





    cartEl.innerHTML = `
        ${state.totalquantity > 0
            ? `<ul class="cats">
                    ${listHtml}
                </ul>
                ${changePageHtml}`
            : `Nothing in the cart`
        }
    `;


}



function resetCart(cartEl) {

    cartEl.innerHTML = ``;
    return;

}




