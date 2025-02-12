import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, AllowNull } from 'sequelize-typescript';


@Table
export default class Employee extends Model {

    @Column({
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    surName: string;

    @Column({
        type: DataTypes.STRING,
        allowNull: false
    })
    email: string;


    @Column({
        type: DataTypes.STRING,
        allowNull: false,
    })
    gsm: string;
}