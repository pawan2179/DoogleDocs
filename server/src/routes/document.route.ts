import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { documentController } from "../controllers/document/document.controller";
import { documentValidator } from "../validators/document.validator";
import { shareValidator } from "../validators/share.validator";
import { shareController } from "../controllers/document/share/share.controller";

const router = Router();

router.get('/:id', authenticate, documentController.getOne);
router.get('/', authenticate, documentController.getAll);
router.put('/:id', authenticate, documentController.update);
router.post('/', authenticate, documentController.create);
router.delete('/:id', authenticate, documentController.delete);
router.post('/:id/share', authenticate, shareController.create);
router.delete('/:documentId/share/:userId', authenticate, shareController.delete)

export default router;