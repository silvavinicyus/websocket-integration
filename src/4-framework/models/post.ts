import { DataTypes, Model } from 'sequelize'
import { IPostEntity } from '@domain/entities/post'
import { sequelize } from '../utility/database'

export class Post extends Model<IPostEntity> {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'posts',
    modelName: 'posts',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
