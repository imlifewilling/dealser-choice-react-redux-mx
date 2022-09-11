import React, {useEffect, useState} from 'react'
import axios from 'axios'
const {createRoot} = require('react-dom/client')
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from './store'

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

    //delete Prodcut
    const deleteProduct = async(id) => {
        try{
            const response = await axios.delete(`/api/products/${id}`)
            dispatch(
                {
                    type: 'DELETE_PRODUCT',
                    products: products.filter(product => product.id !== id)
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    //add a product
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [piece, setPiece] = useState('')
    const [pickid, setPickid] = useState('')

    const newName = (event) => {
        setName(event.target.value)
    }
    const newPrice = (event) => {
        setPrice(event.target.value)
    }
    const newPiece = (event) => {
        setPiece(event.target.value)
    }
    const pickCategoryId = (event) => {
        setPickid(event.target.value)
    }
    // console.log(name, price, piece, pickid)
    const onSubmit = async() => {
        try{
            const response = await axios.post('/api/product',
            {name, price, piece, categoryId: pickid}
            )
            dispatch(
                {
                    type: 'NEW_PRODUCT',
                    product: response.data
                }
            )
            dispatch(
                {
                    type: 'NEW_HASH',
                    hash: pickid
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    //decrease number of product
    const minusProduct = async(id) => {
        try{
            const oldresponse = await axios.get(`/api/products/${id}`)
            // console.log(oldresponse.data)
            if (oldresponse.data['piece'] > 0) {
                oldresponse.data['piece'] -= 1
            }else {
                oldresponse.data['piece'] = 0
            }
            await axios.post(`/api/products/${id}`, oldresponse.data)
                const response = await axios.get(`/api/products/${id}`)
                // console.log(response.data)
                dispatch(
                {
                    type: 'MODIFY_PRODUCT',
                    product: response.data
                }
                )    
        }catch(error){
            console.log(error)
        }
    }

    //increase number of product
    const plusProduct = async(id) => {
        try{
            const oldresponse = await axios.get(`/api/products/${id}`)
            // console.log(oldresponse.data)
            oldresponse.data['piece'] += 1
            await axios.post(`/api/products/${id}`, oldresponse.data)
            const response = await axios.get(`/api/products/${id}`)
            // console.log(response.data)
            dispatch(
                {
                    type: 'MODIFY_PRODUCT',
                    product: response.data
                }
            )
        }catch(error){
            console.log(error)
        }
    }


    //setup the webpage
    return (
        <>
            <h1>Max Grocery Store Products Inventory</h1>
            <main>
                <div>
                    <h2><a href = '#'>Categories</a></h2>
                    <ul id = 'categorylist'>
                        {
                            categories.map(
                                category => {
                                    return (
                                        <li key = {category.id}>
                                            <a href = {`#${category.id}`}>{category.name}</a>
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
                <div>
                    <h2>Products</h2>
                    <ul id = 'productlist'>
                        {
                            products.filter(product => product.categoryId === hash).map(
                                product => {
                                    return (
                                        <li key = {product.id}>
                                            <div>{product.name}</div>
                                            <div>${product.price} </div>
                                            <div>{product.piece}</div>
                                            <div className="input-group">
                                                <button className="button-minus" data-field="quantity" onClick = {()=>minusProduct(product.id)}>-</button>
                                                <input step="1" value= {product.piece} className="quantity-field" />
                                                <button className="button-plus" data-field="quantity" onClick = {()=>plusProduct(product.id)}>+</button>
                                            </div>
                                            <button onClick = {() => deleteProduct(product.id)}> X </button>
                                        </li>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
            </main>
            <form onSubmit={onSubmit}>
                <select defaultValue = "" onChange = {pickCategoryId}>
                <option value ="" disabled>Category</option>
                    {
                        categories.map(
                            category => {
                                return (
                                    <option key = {category.id} value = {category.id}>
                                        {category.name}
                                    </option>
                                )
                            }
                        )
                    }
                </select>
                <input placeholder = 'product' value = {name} onChange = {newName} />
                <input placeholder = 'price' value = {price} onChange = {newPrice} />
                <input placeholder = 'number' value = {piece} onChange = {newPiece} />
                <button onSubmit={onSubmit}>Add Product</button>
            </form>
        </>
    )
};

const root = createRoot(document.querySelector('#root'))

root.render(<Provider store = {store}><APP /></Provider>)