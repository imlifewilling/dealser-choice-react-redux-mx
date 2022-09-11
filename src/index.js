import React, {useEffect} from 'react';
import axios from 'axios';
const {createRoot} = require('react-dom/client');
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from './store';
import Categories from './components/Categories';
import Products from './components/Products';
import AddForm from './components/AddForm';


const APP = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories)
    const products = useSelector(state => state.products)
    const hash = useSelector(state => state.hash)
    // console.log(products)
    
    //get the categories data
    useEffect(()=>{
        const fetchCategories = async() => {
            try {
                const response = await axios.get('/api/categories');
                dispatch(
                    {
                        type: 'SET_CATEGORIES',
                        categories: response.data
                    }
                );
            }catch (error){
                console.log(error)
            }
        };
        fetchCategories()
    }, [])

    //get the products data
    useEffect(()=>{
        const fetchProducts = async() => {
            try {
                const response = await axios.get('/api/products');
                dispatch(
                    {
                        type: 'SET_PRODUCTS',
                        products: response.data
                    }
                );
            }catch (error){
                console.log(error)
            }
        };
        fetchProducts()
    }, [])

    //get the hash value
    useEffect(() => {
        window.addEventListener('hashchange', 
        () => dispatch(
            {
                type: 'GET_HASH',
                hash: window.location.hash.slice(1)
            }
        )
        )
    }, [])
    

    //setup the webpage
    return (
        <>
            <h1>Max Grocery Store Products Inventory</h1>
            <main>
                <Categories />
                <Products />
            </main>
            <AddForm />
        </>
    )
};

const root = createRoot(document.querySelector('#root'))

root.render(<Provider store = {store}><APP /></Provider>)