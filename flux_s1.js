
let state = {};
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
    if (state.owner) {
        console.log('Le propriétaire est ajouté', state.owner)
        document.getElementById('header').textContent = `Le propriétaire du restaurant est ${state.owner.firstName}`
    }
})

// Nous diffusons un premier changement de la valeur du state
dispatch({
    company: {
        name: 'Burger du Pré'
    },
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
    })
})
