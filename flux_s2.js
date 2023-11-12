
let state = {
    value: null,
    list: []
};
// Nous stockons ici les fonctions qui seront appelées à chaque changement des valeurs du state
const subscribers = [];

// La fonction dispatch prend la nouvelle valeur du state pour la passer à chaque subscriber
const dispatch = (newStateValue) => {
    state = newStateValue;
    for (const fct of subscribers) {
        fct(state)
    }
}

// La fonction ajoute une fonction 'subscriber' à la liste des subscribers
const subscribe = (subscriberFct) => {
    subscribers.push(subscriberFct);
}

// Nous nous abonnons au changement du state pour venir modifier le nom du propriétaire
subscribe((state) => {
    console.log(state)
    if (state.owner) {
        console.log('Le propriétaire est ajouté', state.owner)
        document.getElementById('header').textContent = `Le propriétaire du restaurant est ${state.owner.firstName}`
    }
    if (state.list) {
        document.getElementById('command').innerHTML = ``;
        for (let item of state.list) {
            const itemElement = document.createElement('div')
            itemElement.innerHTML = `
            <div>
            ${item.title} <span>${item.price}</span>
            </div>
            `
            document.getElementById('command').appendChild(itemElement)
       }
    }
})

// Nous diffusons un premier changement de la valeur du state
dispatch({
    company: {
        name: 'Burger du Pré'
    },
    list: []
})


// Nous ajoutons un EventListener au submit du formulaire
document.getElementById('addForm').addEventListener("submit", (evt) => {
    evt.preventDefault()
    const firstNameInput = evt.currentTarget.firstName
    dispatch({
        company: {
            name: 'Burger du Pré'
        },
        owner: {
            firstName: firstNameInput.value,
        },
        list: []
    })
})

// Nous ajoutons un EventListener au click sur un bouton "produit" pour l'ajouter à notre liste
document.querySelectorAll('.orderButton').forEach((element) => {
    element.addEventListener('click', (event) => {
        console.info(state)
        const productId = event.target.dataset['id']
        const productList = state.list
        productList.push(PRODUCT_LIST[productId])
        dispatch({
            company: {
                name: 'Burger du Pré'
            },
            list: productList,
        })
    })
})

const DoubleCantal = {
    title: 'Double Cantal',
    price: 15.99,
}


const SuperCremeux = {
    title: 'Super Crémeux',
    price: 14.99,
}


const PouletCroquant = {
    title: 'Poulet Croquant',
    price: 17.99,
}

const PRODUCT_LIST = {
    PouletCroquant,
    SuperCremeux,
    DoubleCantal,
}

