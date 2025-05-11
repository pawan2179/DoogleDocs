import { Dispatch, SetStateAction, useContext, useState } from "react";
import DocumentUser from "../../../types/interfaces/document-user"
import DocumentInterface from "../../../types/interfaces/document";
import useRandomBackground from "../../../hooks/useRandomBackground";
import useAuth from "../../../hooks/useAuth";
import { ToastContext } from "../../../contexts/toast-context";
import { DocumentContext } from "../../../contexts/documentContext";
import DocumentService from "../../../services/document-service";
import DocumentUserService from "../../../services/document-user-service";

interface SharedUserProps {
  documentUsers: Array<DocumentUser>;
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>
}
const SharedUsers = ({documentUsers, setDocument}: SharedUserProps) => {
  const {backgroundColor} = useRandomBackground();
  const {backgroundColor: sharedUserBackgroundColor} = useRandomBackground();
  const {accessToken, email} = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const {addToast} = useContext(ToastContext);
  const {document} = useContext(DocumentContext);

  const removeDocumentUser = async(payload: {documentId: number, userId: number}) => {
    if(accessToken === null)  return ;
    setLoading(true);
    try {
      await DocumentUserService.delete(accessToken, payload);
      setDocument({
        ...document,
        users: document?.users.filter((user) => user.userId !== payload.userId) as Array<DocumentUser>
      } as DocumentInterface)
    } catch (err) {
      addToast({
        color: "danger",
        title: "Unable to remove user",
        body: "Please try again"
      })
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      <div className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
        <div className="flex items-center space-x-2">
          <div className={`${backgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}>
            {email !== null && email[0]}
          </div>
          <p className="font-medium">{email !== null && email} (you)</p>
        </div>
        <p className="text-gray-500 italic">Owner</p>
      </div>
      {documentUsers.map((user) => {
        return (
          <div key={user.user.email} className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
            <div className="flex items-center space-x-2">
              <div className={`${sharedUserBackgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}>
                {user.user.email && user.user.email[0]}
              </div>
              <p className="font-medium">{user.user.email}</p>
            </div>
            <button
              onClick={() => removeDocumentUser({documentId: user.documentId, userId: user.userId})}
              disabled={loading}
              className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
            >
              Remove
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SharedUsers;