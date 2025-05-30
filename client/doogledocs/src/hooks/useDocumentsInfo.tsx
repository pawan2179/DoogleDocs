import { useContext, useEffect, useState } from "react";
import useAuth from "./useAuth"
import DocumentInterface from "../types/interfaces/document";
import { ToastContext } from "../contexts/toast-context";
import DocumentService from "../services/document-service";

const useDocumentsInfo = () => {
  const {accessToken} = useAuth();
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const [loading, setLoading] = useState<boolean> (false);
  const {error} = useContext(ToastContext);

  const loadDocuments = async(accessToken: string) => {
    setLoading(true);
    try {
      const response = await DocumentService.list(accessToken);
      setDocuments(response.data as Array<DocumentInterface>);
    } catch (err) {
      error('Unable to load documents. Please try again');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(accessToken === null)  return ;
    loadDocuments(accessToken);
  }, [accessToken]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading
  }
}

export default useDocumentsInfo;