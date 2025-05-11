import { useParams } from "react-router-dom";
import useWindowSize from "../../hooks/useWindowSize"
import useDocument from "../../hooks/useDocument";
import DocumentHeader from "../../components/organisms/document-header";
import { useContext, useEffect, useRef } from "react";
import { DocumentContext } from "../../contexts/documentContext";

const Document = () => {
  const {heightStr, widthStr} = useWindowSize();
  const {id: documentId} = useParams();
  const documentHeaderRef = useRef<null | HTMLDivElement>(null);
  const {loading, document} = useDocument(parseInt(documentId as string));
  const {setDocument} = useContext(DocumentContext);

  useEffect(() => {
    if(document !== null) setDocument(document);
  }, [document]);

  return (
    <div className="w-full h-full bg-gray flex flex-col" style={{height: heightStr}}>
      {loading ? (
        <>Loading...</>
      ): (
        <>
          <DocumentHeader documentHeaderRef={documentHeaderRef} />
        </>
      )}
    </div>
  )
}

export default Document;