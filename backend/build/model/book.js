"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
class Book extends sequelize_1.Model {
    static findById(id) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndDelete(id) {
        throw new Error('Method not implemented.');
    }
    static find() {
        throw new Error('Method not implemented.');
    }
    static findByIdAndUpdate(bookId, arg1, arg2) {
        throw new Error('Method not implemented.');
    }
}
Book.init({
    bookName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    publishedDate: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isbnNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING, // Store image file path
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: 'books',
});
exports.default = Book;
