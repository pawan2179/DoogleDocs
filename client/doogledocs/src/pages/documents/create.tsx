import CreateDocumentButton from "../../components/atoms/create-document-button";
import Spinner from "../../components/atoms/spinner";
import DocumentsList from "../../components/molecules/documents-list";
import DocumentCreateHeader from "../../components/organisms/document-create-header";
import useAuth from "../../hooks/useAuth";
import useDocumentsInfo from "../../hooks/useDocumentsInfo";
import useWindowSize from "../../hooks/useWindowSize"

const Create = () => {
  const {heightStr} = useWindowSize();
  const {userId} = useAuth();
  const {documents, loading, setDocuments} = useDocumentsInfo();

  const recentDocuments = documents === null ? [] : documents.filter((document) => document.userId === userId);
  const sharedDocuments = documents === null ? [] : documents.filter((document) => document.userId !== userId);

  return (
    <div style={{height: heightStr}}>
      <DocumentCreateHeader />
      <CreateDocumentButton />
      {loading ? (
        <Spinner size="lg" />
      ): (
        <>
          <DocumentsList
            title="Recent Documents"
            documents={recentDocuments}
            setDocuments={setDocuments}
          />
          <DocumentsList
            title="Shared Documents"
            documents={sharedDocuments}
            setDocuments={setDocuments}
          />
        </>
      )}
    </div>
  )
}

export default Create;