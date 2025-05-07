import sequelize from "../../config/db.config";
import { DocuemntUser } from "./document-user.model";
import { RefreshToken } from "./refreshToken.model";
import { Role } from "./role.model";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";
import { Document } from "./document.model";
import { Sequelize } from "sequelize";

sequelize.addModels([
  User,
  RefreshToken,
  Role,
  UserRole,
  Document,
  DocuemntUser
])

const db = {
  Sequelize,
  sequelize,
  User,
  RefreshToken,
  Role,
  UserRole,
  DocuemntUser,
  Document
}

export default db;