import { BelongsTo, Column, DataType, ForeignKey, PrimaryKey, Table, Model } from "sequelize-typescript";
import PermissionEnum from "../../types/enums/permission-enum";
import { User } from "./user.model";
import { Document } from "./document.model";

@Table({tableName:'document_user', underscored: true})
class DocuemntUser extends Model {
  @Column(DataType.ENUM("VIEW","EDIT"))
  permission!: PermissionEnum

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column
  userId!: number;

  @BelongsTo(() => Document)
  document!: Document

  @ForeignKey(() => Document)
  @PrimaryKey
  @Column
  documentId!:number
}

export {DocuemntUser}