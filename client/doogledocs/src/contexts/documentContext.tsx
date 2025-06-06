import { createContext, Dispatch, JSX, SetStateAction, useContext, useEffect, useState } from "react";
import DocumentInterface from "../types/interfaces/document";
import { ToastContext } from "./toast-context";
import useAuth from "../hooks/useAuth";
import DocumentService from "../services/document-service";

interface DocumentContextInterface {
  document: DocumentInterface | null;
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>;
  errors: Array<string>
  setErrors: Dispatch<SetStateAction<Array<string>>>;
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>;
  saving: boolean,
  setSaving: Dispatch<SetStateAction<boolean>>;
  currentUsers: Set<string>
  setCurrentUsers: Dispatch<SetStateAction<Set<string>>>;
  setDocumentTitle: (title: string) => void;
  saveDocument: (updateDocument: DocumentInterface) => Promise<void>;
}

const defaultValues: DocumentContextInterface = {
  document: null,
  setDocument: (() => {}),
  errors: [],
  setErrors: () => {},
  loading: false,
  setLoading: () => {},
  saving: false,
  setSaving: () => {},
  currentUsers: new Set<string>(),
  setCurrentUsers: () => {},
  setDocumentTitle: () => {},
  saveDocument: async() => {}
}

export const DocumentContext = createContext<DocumentContextInterface>(defaultValues);

interface DocumentProviderInterface {
  children: JSX.Element;
}

export const DocumentProvider = ({children}: DocumentProviderInterface) => {
  const {error} = useContext(ToastContext);
  const {accessToken} = useAuth();

  const [document, setDocument] = useState<DocumentInterface | null>(defaultValues.document);
  const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [saving, setSaving] = useState<boolean>(defaultValues.saving);
  const [currentUsers, setCurrentUsers] = useState(defaultValues.currentUsers);

  const setDocumentTitle = (title: string) => {
    setDocument({...document, title} as DocumentInterface);
  }
  const saveDocument = async(updatedDocument: DocumentInterface) => {
    if(accessToken === null)  return ;
    setSaving(true);
    try {
      await DocumentService.update(accessToken, updatedDocument);
      setDocument(updatedDocument);
    } catch (error) {
      setErrors(["There was an error saving the document. Please try again"]);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if(errors.length) {
      errors.forEach((err) => {
        error(err);
      })
    }
  }, [errors]);

  return (
    <DocumentContext.Provider
      value={{
        document,
        errors,
        loading,
        saving,
        currentUsers,
        setDocument,
        setErrors,
        setLoading,
        setSaving,
        setCurrentUsers,
        setDocumentTitle,
        saveDocument
      }}
      >{children}</DocumentContext.Provider>
  )
}