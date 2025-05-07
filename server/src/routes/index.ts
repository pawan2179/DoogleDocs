import { Request, Response, Router } from "express";
import userRouter from './user.route';
import authRouter from './auth.route';
import documentRouter from './document.route';
import { authenticate, authorize } from "../middlewares/auth.middleware";
import RoleEnum from "../types/enums/role-enum";

const router = Router();

router.get('/', authenticate, authorize([RoleEnum.SUPERADMIN]), async(req: Request, res: Response) => {
  res.sendStatus(200);
  return ;
})

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/document', documentRouter);

export default router;