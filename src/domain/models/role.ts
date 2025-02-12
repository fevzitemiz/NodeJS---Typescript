import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType, AutoIncrement, AllowNull } from 'sequelize-typescript';


@Table
export default class Role extends Model {

    @Column({
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;
}