import React from 'react';
import{useSelector} from 'react-redux';

const Categories = () => {
    const categories = useSelector(state => state.categories)
    const hash = useSelector(state => state.hash)
    return (
        <div id = 'categorycomponet'>
            <h2><a href = '#'>Categories</a></h2>
            <ul id = 'categorylist'>
                {
                    categories.map(
                        category => {
                            return (
                                <li key = {category.id} id = {category.id === hash ? 'selecteditem' : ''}>
                                    <a href = {`#${category.id}`}>{category.name}</a>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default Categories