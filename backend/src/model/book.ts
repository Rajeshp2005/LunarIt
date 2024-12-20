import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection';

class Book extends Model {
    static findById(id: string) {
        throw new Error('Method not implemented.');
    }
    static findByIdAndDelete(id: string) {
        throw new Error('Method not implemented.');
    }
    static find() {
        throw new Error('Method not implemented.');
    }
    static findByIdAndUpdate(bookId: any, arg1: { image?: string | undefined; bookName: any; author: any; price: any; description: any; }, arg2: { new: boolean; }) {
        throw new Error('Method not implemented.');
    }
    public bookName!: string;
    public author!: string;
    public description!: string;
    public price!: number;
    public publishedDate!: string;
    public isbnNumber!: string;
    public image!: string; // Store the image file path here
}

Book.init(
    {
        bookName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        publishedDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbnNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING, // Store image file path
            allowNull: true,
            unique:true,
        },
    },
    {
        sequelize,
        tableName: 'books',
    }
);

export default Book;
