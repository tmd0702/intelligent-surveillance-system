import React from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// draft-js
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Custom styles for the MDEditor
import MDEditorRoot from "components/MDEditor/MDEditorRoot";

// Softzone context
import { useMaterialUIController } from "context";

function MDEditor({ value }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const blocksFromHTML = convertFromHTML(value);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  // Initialize editorState with default HTML content
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(contentState)
  );

  const [convertedContent, setConvertedContent] = React.useState();

  React.useEffect(() => {
    const html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  return (
    <MDEditorRoot ownerState={{ darkMode }}>
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
    </MDEditorRoot>
  );
}

// Setting default values for the props of MDEditor
MDEditor.defaultProps = {
  value: "",
};

// Typechecking props for the MDEditor
MDEditor.propTypes = {
  value: PropTypes.string,
};

export default MDEditor;
