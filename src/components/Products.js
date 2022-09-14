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
            let oldproductnumber = products.find(product => product.id === id).piece
            console.log(oldproductnumber)
            if (oldproductnumber > 0) {
                oldproductnumber -= 1
            }else {
                oldproductnumber = 0
            }
            const response = await axios.put(`/api/products/${id}`, {piece: oldproductnumber})
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
            const response = await axios.put(`/api/products/${id}`, {piece: products.find(product => product.id === id).piece + 1})
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
        <div id = 'productcomponent'>
            <h2>Products</h2>
            <ul id = 'productlist'>
                {
                    products.filter(product => product.categoryId === hash).map(
                        product => {
                            return (
                                <li key = {product.id} id = {product.categoryId === hash ? 'selecteditem' : ''}>
                                    <div>{product.name}</div>
                                    <div>${product.price} </div>
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