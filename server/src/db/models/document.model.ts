import { BelongsTo, Column, DataType, Default, DefaultScope, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { DocuemntUser } from "./document-user.model";

@DefaultScope(() => ({
  include: [
    {
      model: DocuemntUser,
      include: [
        {
          model: User,
          attributes: ['email']
        }
      ]
    }
  ]
}))

@Table({tableName: 'document', underscored: true})
class Document extends Model {
  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.JSONB)
  content!: string;

  @ForeignKey(() => User)
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => DocuemntUser, {
    onDelete: "CASCADE"
  })
  users!: Array<DocuemntUser>

  @Default(false)
  @Column(DataType.BOOLEAN)
  isPublic!: boolean;
}

export {Document}