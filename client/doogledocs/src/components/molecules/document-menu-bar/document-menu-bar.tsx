import { ChangeEvent, useContext } from "react";
import useAuth from "../../../hooks/useAuth"
import { DocumentContext } from "../../../contexts/documentContext";
import DocumentInterface from "../../../types/interfaces/document";
import DocumentService from "../../../services/document-service";
import Logo from "../../atoms/logo";
import UserDropDown from "../../atoms/user-dropdown";
import useRandomBackground from "../../../hooks/useRandomBackground";
import ShareDocumentModal from "../share-document-modal";

const DocumentMenuBar = () => {
  const {accessToken, userId} = useAuth();
  const {document, saving, setDocumentTitle, setDocument, setSaving, setErrors} = useContext(DocumentContext);

  const handleTitleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const title = (event.target as HTMLInputElement).value;
    setDocumentTitle(title);
  }

  const handleTitleInputBlur = async(event: React.FocusEvent<HTMLInputElement>) => {
    if(accessToken === null || document === null) return ;
    setSaving(true);
    const title = (event.target as HTMLInputElement).value;
    const updateDocument = {
      ...document,
      title
    } as DocumentInterface;

    try {
      await DocumentService.update(accessToken, updateDocument);
    } catch (error) {
      setErrors(["There was error saving the document, please try again"]);
    } finally {
      setSaving(false);
    }
  }

  const CurrentUser = () => {
    const {email} = useAuth();
    const {currentUsers} = useContext(DocumentContext);
    const {backgroundColor} = useRandomBackground();
    return (
      <>
        {Array.from(currentUsers).filter((currentUser) => currentUser !== email).map((currentUser) => {
          return (
            <div key={currentUser} className={`${backgroundColor} w-8 h-8 text-white font-semibold flex justify-center items-center rounded-full shrink-0 uppercase ring-2`}>
              {currentUser[0]}
            </div>
          )
          })}
      </>
    )
  }

  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b border-gray-300">
      <div className="w-full flex justify-start items-center overflow-x-hidden md:overflow-visible">
        <Logo />
        <div className="flex flex-col">
          <input
            maxLength={25}
            type="text"
            onBlur={(event) => handleTitleInputBlur(event)}
            onChange={(event) => handleTitleInputChange(event)}
            value={document?.title ? document?.title :""}
            className="font-medium text-lg px-2 pt-2"
            name=""
            id=""
            placeholder="Untitled Document"
          />
          <div className="flex items-center">
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
            {saving && <p className="text-sm text-gray-500 px-2">Saving...</p>}
          </div>
        </div>
      </div>
      {/* RIGHT PART */}
      <div className="flex items-center shrink-0 pl-3 gap-x-4">
        {document !== null && document.userId === userId && (
          <ShareDocumentModal />
        )}
        <div className="flex items-center gap-x-2">
          <CurrentUser />
          <UserDropDown />
        </div>
      </div>
    </div>
  )
}

export default DocumentMenuBar;