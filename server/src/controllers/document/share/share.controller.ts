import e, { Request, Response } from "express";
import catchAsync from "../../../middlewares/catch-async";
import { validationResult } from "express-validator";
import { Document } from "../../../db/models/document.model";
import { User } from "../../../db/models/user.model";
import { DocuemntUser } from "../../../db/models/document-user.model";
import { mailService } from "../../../services/mail.service";
import dotenv from 'dotenv';

dotenv.config();

class ShareController {
  public create = catchAsync(async(req: Request, res: Response) => {
    console.log("in share controller");
    // const err = validationResult(req);
    // if(err) {
    //   return res.status(400).json(err);
    // }

    const {id} = req.params;
    const document = await Document.findByPk(id);
    if(!document) {
      console.log("document not found");
      return res.sendStatus(403);
    }
    if(!req.user?.id || document.userId !== parseInt(req.user?.id)) {
      console.log('user not found');
      return res.sendStatus(400);
    }

    const {email, permission} = req.body;
    const sharedUser = await User.findOne({
      where: {
        email
      }
    });
    if(!sharedUser) {
      console.log('shared user not found');
      return res.sendStatus(400);
    }
    const documentUser = await DocuemntUser.create({
      documentId: id,
      userId: sharedUser.id,
      permission
    });

    const mail = {
      from: process.env.HOST_EMAIL,
      to: sharedUser.email,
      subject: `${req.user.email} shared a document with you.`,
      text: `Click the following link to view and edit the document: http://localhost:5173/document/${id}`
    };
    //call mail service to send email
    await mailService.sendMail(mail);
    return res.status(201).json(documentUser);
  });

  public delete = catchAsync(async(req: Request, res: Response) => {
    const err = validationResult(req);
    if(!err.isEmpty()) {
      return res.status(400).json(err);
    }

    const {documentId, userId} = req.params;
    const document = await Document.findOne({
      where: {
        id: documentId,
        userId: req.user?.id
      }
    })
    if(!document) return res.sendStatus(400);

    const query = {
      where: {
        documentId,
        userId
      }
    }
    const documentUser = await DocuemntUser.findOne(query);
    if(!documentUser) return res.sendStatus(400);
    await DocuemntUser.destroy(query);

    return res.sendStatus(200);
  })
}

const shareController = new ShareController();
export {shareController};