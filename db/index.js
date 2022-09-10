const Sequelize = require('sequelize')
const {UUID, UUIDV4, STRING, DECIMAL, INTEGER} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/dealsers-choice-react-redux-db')

const Category = conn.define('category', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

const Product = conn.define('product', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    piece: {
        type: INTEGER
    }
})

Product.belongsTo(Category);
Category.hasMany(Product);

const seedAndSync = async() => {
    await conn.sync({force: true})
    const categories = ['meat', 'beverage', 'snack'];
    const [meat, beverage, snack] = await Promise.all(
        categories.map(
            name => Category.create({name})
        )
    );

    const products = [
        {
            name: 'pork',
            price: 1.00,
            piece: 10,
            categoryId: meat.id
        },
        {
            name: 'beaf',
            price: 1.00,
            piece: 20,
            categoryId: meat.id
        },
        {
            name: 'chicken',
            price: 1.00,
            piece: 30,
            categoryId: meat.id
        },
        {
            name: 'Cokecola',
            price: 0.50,
            piece: 5,
            categoryId: beverage.id
        },
        {
            name: 'Greentea',
            price: 0.75,
            piece: 7,
            categoryId: beverage.id
        },
        {
            name: 'Chips',
            price: 1.50,
            piece: 12,
            categoryId: snack.id
        }
    ]

    await Promise.all(
        products.map(
            product => Product.create(product)
        )
    )
}

module.exports = {
    Category,
    Product,
    seedAndSync
}