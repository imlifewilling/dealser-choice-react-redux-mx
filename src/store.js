import { createStore } from 'redux';


const initialState = {
    categories: [],
    products:[],
    hash: []
}


const reducer = (state = initialState, action) => {
    if(action.type === 'SET_CATEGORIES'){
        state = {...state, categories: action.categories};
    }
    else if(action.type === 'SET_PRODUCTS'){
        state = {...state, products: action.products};
    }
    else if(action.type === 'GET_HASH'){
        state = {...state, hash: action.hash};
    }
    else if(action.type === 'DELETE_PRODUCT'){
        state = {...state,  products: action.products};
    }
    else if(action.type === 'NEW_PRODUCT'){
        state = {...state,  products: [...state.products, action.product]};
    }
    else if(action.type === 'NEW_HASH'){
        state = {...state,  hash: action.hash};
    }
    else if(action.type === 'MODIFY_PRODUCT'){
        state = {...state,  products: [...state.products].map(
            product =>  {
                if(product.id === action.product.id){
                    return action.product
                }
                return product
            }
        )};
    }
    // console.log(state);
    return state;
}

const store = createStore(reducer)

export default store;