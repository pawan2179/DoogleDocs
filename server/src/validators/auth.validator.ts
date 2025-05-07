import { body } from "express-validator";

class AuthValidator {
  public login = [
    body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Must provide a valid email"),
    body("pasword")
    .exists()
    .withMessage("Must provide a password")
  ];

  public refreshToken = [
    body('token').exists().withMessage("Must provide a valid token.")
  ]
}

const authValidator = new AuthValidator();
export default authValidator;