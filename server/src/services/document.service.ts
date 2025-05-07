import { Op } from "sequelize"
import { Document } from "../db/models/document.model"
import { DocuemntUser } from "../db/models/document-user.model";

class DocumentService {
  public findDocumentById = async(id: number, userId: number) => {
    let document = await Document.findOne({
      where: {
        [Op.or]: [
          {
            id: id,
            userId: userId
          },
          {
            id: id,
            isPublic: true
          }
        ]
      }
    });
    if(!document) {
      const sharedDocuement = await DocuemntUser.findOne({
        where: {
          userId: userId,
          documentId: id
        },
        include: {
          model: Document
        }
      })
      if(!sharedDocuement)  return null;
      document = sharedDocuement.document;
    }
    return document;
  }
}

export default new DocumentService();