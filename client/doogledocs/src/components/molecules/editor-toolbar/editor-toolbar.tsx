import { useContext } from "react"
import { EditorContext } from "../../../contexts/editorContext"
import { EditorState } from "draft-js";
import IconBtn from "../../atoms/icon-btn";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FontSelect from "../../atoms/font-select";

const EditorToolbar = () => {
  const {editorState, setEditorState} = useContext(EditorContext);

  const handleUndo = () => {
    setEditorState(EditorState.undo(editorState));
  }

  const handleRedo = () => {
    setEditorState(EditorState.redo(editorState));
  }

  return (
    <div className="w-full h-9 px-3 py-1 shrink-0 flex items-center">
      <IconBtn onClick={handleUndo} icon={<FaArrowLeft className="h-4 w-4"/>} tooltip="Undo" />
      <IconBtn onClick={handleRedo} icon={<FaArrowRight className="h-4 w-4"/>} tooltip="Redo" />
      <div className="h-5 border-1 border-1-gray-300 mx-2"></div>
      <FontSelect />
    </div>
  )
}

export default EditorToolbar;