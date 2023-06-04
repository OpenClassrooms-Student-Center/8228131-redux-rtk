
let state = {
    value: null,
    list: []
};
const subscribers = [];

const dispatch = (newStateValue) => {
    state = newStateValue;
    for (const fct of subscribers) {
        fct(state)
    }
}

const subscribe = (subscriberFct) => {
    subscribers.push(subscriberFct);
}

const reducer = (currentState, action ) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            const listWithNewProduct = [...currentState.list, action.payload]
            return {...currentState, list: listWithNewProduct}
        case 'REMOVE_PRODUCT':
            const list = currentState.list.filter(
                (item, index) => index !== action.payload
            )
            return {...currentState, list: list}
        case 'APPLY_VOUCHER':
            const withVoucherList = currentState.list.map(
                item => item.title === 'Super Crémeux' ? ({...item, price: action.payload.price}) : item
            )
            return {...currentState, list: withVoucherList}
        
        case 'UPDATE_FIRSTNAME':
            const owner = {...currentState.owner, firstName: action.payload}
            return {...currentState, owner}
        default:
            return currentState
    }
}

subscribe((state) => {
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

dispatch({...state, company: {name: 'Burger du Pré'}})


document.getElementById('addForm').addEventListener("submit", (evt) => {
    evt.preventDefault()
    const firstNameInput = evt.currentTarget.firstName
    const newState = reducer(state, {type: 'UPDATE_FIRSTNAME', payload: firstNameInput.value })
    dispatch(newState)
})

document.querySelectorAll('.orderButton').forEach((element) => {
    element.addEventListener('click', (event) => {
        const productId = event.target.dataset['id']
        const newState = reducer(state, {type: 'ADD_PRODUCT', payload: PRODUCT_LIST[productId] })
        dispatch(newState)
    })
})

document.getElementById('voucher').addEventListener("click", (evt) => {
    const newState = reducer(state, {type: 'APPLY_VOUCHER', payload: {price: 2.00} })
    dispatch(newState)
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





