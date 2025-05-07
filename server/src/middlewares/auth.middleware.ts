import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { VerifyErrors } from 'jsonwebtoken';
import RoleEnum from "../types/enums/role-enum";
import { UserRole } from "../db/models/user-role.model";
import { Role } from "../db/models/role.model";

const authenticate : RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
    return ;
  }
  jwt.verify(
    token,
    "access_token",
    (err: VerifyErrors | null, decoded: unknown) => {
      if (err) {
        res.sendStatus(403);
        return ;
      }
        try {
        const { id, email, roles } = decoded as RequestUser;
        req.user = { id, email, roles };
        next();
      } catch (error) {
        console.log(error);
        res.sendStatus(403);
        return ;
      }
    }
  );
};

const authorize = (permittedRoles: Array<RoleEnum>) => {
  return async(req: Request, res: Response, next: NextFunction) => {
    if(!req.user) {
      res.sendStatus(403);
      return ;
    }
    const userId = req.user?.id;

    UserRole.findAll({where: {userId}, include: Role})
      .then((data) => {
        const roles = data.map((userRole) => userRole.role.name);
        if(permittedRoles.some((permittedRole) => roles.includes(permittedRole))) {
          next();
        }
        else {
          res.sendStatus(403);
          return ;
        }
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(403);
        return ;
      })
  }
}

export {authenticate, authorize};