// Import React dependencies.
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
// Import the Slate editor factory.
import { createEditor, Transforms, Editor, Text } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faCode } from '@fortawesome/free-solid-svg-icons'

const ButtonGroup = styled.section`
  border: 1.25px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
`

const Button = styled.button`
  width: 35px;
  height: 35px;
  margin: 0.5rem;
  color: ${({ theme }) => theme.secondary};
  background-color: transparent;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.secondary};
  border-radius: 10px;
`

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }]
  }
]

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === 'code'
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: (n) => Editor.isBlock(editor, n) }
    )
  }
}

const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <mark>{props.children}</mark>
    </pre>
  )
}

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>
}

function Editor_Slate() {
  const [editor] = useState(() => withReact(createEditor()))
  console.log('Operations now is:', editor.operations)
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />
  }, [])
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        )
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value)
          sessionStorage.setItem('content', content)
        }
      }}
    >
      <ButtonGroup>
        <Button onClick={() => CustomEditor.toggleBoldMark(editor)}>
          <FontAwesomeIcon icon={faBold} />
        </Button>
        <Button onClick={() => CustomEditor.toggleCodeBlock(editor)}>
          <FontAwesomeIcon icon={faCode} />
        </Button>
      </ButtonGroup>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            // When "`" is pressed, keep our existing code block logic.
            case '`': {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
              break
            }

            // When "B" is pressed, bold the text in the selection.
            case 'b': {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
              break
            }
          }
        }}
      />
    </Slate>
  )
}

export default Editor_Slate
