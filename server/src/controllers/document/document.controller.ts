import { Request, Response } from "express";
import catchAsync from "../../middlewares/catch-async";
import documentService from "../../services/document.service";
import { Document } from "../../db/models/document.model";
import { DocuemntUser } from "../../db/models/document-user.model";
import { validationResult } from "express-validator";

class DocumentController {
  public getOne = catchAsync(async(req: Request, res: Response) => {
    if(!req.user) return res.sendStatus(401);
    const {id} = req.params;
    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));
    if(document === null) return res.status(403);

    return res.status(200).json(document)
  })

  public getAll = catchAsync(async(req: Request, res: Response) => {
    const documents =  await Document.findAll({
      where: {
        userId: req.user?.id
      },
    });
    const documentUsers = await DocuemntUser.findAll({
      where: {
        userId: req.user?.id
      },
      include: {
        model: Document
      }
    });

    const sharedDocuments = documentUsers.map(
      (documentUser) => documentUser.document
    );

    documents.push(...sharedDocuments);
    return res.status(200).json(documents);
  })

  public update = catchAsync(async(req: Request, res: Response) => {
    const err = validationResult(req);
    if(err) {
      return res.status(400).json(err);
    }
    if(!req.user) {
      return res.sendStatus(401);
    }
    const {id} = req.params;
    const {title, content, isPublic} = req.body;
    
    const document = await documentService.findDocumentById(parseInt(id), parseInt(req.user.id));
    if(document === null || document === undefined) return res.sendStatus(404);

    if(title !== undefined && title !== null) document.title = title;
    if(content !== undefined && content !== null) document.content = content;
    if(isPublic !== undefined && isPublic !== null) document.isPublic = isPublic;

    await document.save();
    return res.sendStatus(200);
  });

  public create = catchAsync(async(req: Request, res: Response) => {
    const document = await Document.create({
      userId: req.user?.id
    })

    return res.status(201).json(document);
  });

  public delete = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    await Document.destroy({
      where: {
        id: id,
        userId: req.user?.id
      }
    });
    return res.status(200);
  })
}

const documentController = new DocumentController();
export {documentController};