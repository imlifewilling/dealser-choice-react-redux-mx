import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const AddForm = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    // const prodcuts = useSelector(state => state.prodcuts);
    // const hash = useSelector(state => state.hash);

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

    return (
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
)
}

export default AddForm