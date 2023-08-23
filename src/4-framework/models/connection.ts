import { DataTypes, Model } from 'sequelize'
import { IConnectionEntity } from '@domain/entities/connections'
import { sequelize } from '../utility/database'

export class ConnectionModel extends Model<IConnectionEntity> {}

ConnectionModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    connectionId: {
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
    tableName: 'connections',
    modelName: 'connections',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
