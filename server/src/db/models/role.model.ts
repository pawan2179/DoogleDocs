import { Model, Column, DataType, Table, BelongsTo, BelongsToMany, HasMany } from "sequelize-typescript";
import RoleEnum from "../../types/enums/role-enum";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";

@Table({tableName: 'role', underscored:true,timestamps: false})
class Role extends Model {
  @Column(DataType.ENUM('ADMIN', 'SUPERADMIN'))
  name!: RoleEnum

  @BelongsToMany(() => User, {
    through: () => UserRole
  })
  users!: Array<User>

  @HasMany(() => UserRole, {
    onDelete: "CASCADE"
  })
  roleUsers!: Array<UserRole>;
}

export {Role};