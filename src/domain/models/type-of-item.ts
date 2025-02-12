import { DataTypes } from 'sequelize';
import { Table, Column, Model, DataType} from 'sequelize-typescript';


@Table
export default class TypeOfItem extends Model {

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