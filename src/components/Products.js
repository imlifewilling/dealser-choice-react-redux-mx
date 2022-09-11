import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const hash = useSelector(state => state.hash)

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

    return (
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
    )
}

export default Products