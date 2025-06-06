import { useContext } from "react"
import { EditorContext } from "../../../contexts/editorContext"
import { Editor } from "draft-js";

const DocumentEditor = () => {
  const {editorState, editorRef, handleEditorChange, focusEditor} = useContext(EditorContext);
  return (
    <div
      style={{height: '1100px', width: '850px '}}
      className="bg-white shadow-md shrink-0 cursor-text p-12"
      onClick={focusEditor}
    >
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleEditorChange}
      />
    </div>
  )
}

export default DocumentEditor;