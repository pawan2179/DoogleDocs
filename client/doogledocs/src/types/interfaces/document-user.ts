import type PermissionEnum from "../enums/permission-enums";

export default interface DocumentUser {
  permission: PermissionEnum;
  userId: number;
  documentId: number,
  createdAt: Date,
  updatedAt: Date,
  user: {
    email: string
  }
}