import { Table, Column, DataType, HasMany, Model, BelongsToMany, Scopes } from "sequelize-typescript";
import { RefreshToken } from "./refreshToken.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { DocuemntUser } from "./document-user.model";

@Scopes(() => ({
  withRoles: {
    include: [
      {
        model: UserRole,
        attributes: ["createdAt", "updatedAt"],
        include: [Role]
      }
    ]
  }
}))

@Table({tableName: 'user', underscored: true})
class User extends Model {
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  password!: string

  @Column(DataType.BOOLEAN)
  isVerified!: boolean

  @Column(DataType.STRING)
  verificationToken!: string

  @Column(DataType.STRING)
  passwodResetToken!: string

  @HasMany(() => RefreshToken, {
    onDelete: 'CASCADE'
  })
  refreshTokens!: Array<RefreshToken>

  @BelongsToMany(() => Role, {
    through: {
      model:() => UserRole
    }
  })
  roles!: Array<UserRole>

  @HasMany(() => UserRole, {
    onDelete: "CASCADE"
  })
  userRole!: Array<UserRole>

  @HasMany(() => DocuemntUser, {
    onDelete: "CASCADE"
  })
  sharedDocuments!: Array<DocuemntUser>
}

export {User}