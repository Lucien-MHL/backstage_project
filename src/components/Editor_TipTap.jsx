import React from 'react'
import styled from 'styled-components'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBold,
  faCode,
  faFont,
  faItalic,
  faListOl,
  faListUl,
  faQuoteLeft,
  faStrikethrough,
  faTerminal
} from '@fortawesome/free-solid-svg-icons'

const TextArea = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  * > code {
    background-color: #fff;
    color: #000;
  }

  * > pre {
  }

  // 移除預設外框
  * > *:focus-visible {
    outline: none;
  }
`

const ButtonGroup = styled.section``

const Button = styled.button`
  background-color: ${({ theme, active }) =>
    active ? theme.secondary : 'transparent'};
  color: ${({ theme, active }) => (active ? theme.primary : theme.secondary)};
  border: 1px solid
    ${({ theme, active }) => (active ? theme.primary : theme.secondary)};
  width: 35px;
  height: 35px;
  cursor: pointer;

  &.heading-group {
    display: inline-block;
  }

  /* &.heading-group::after{
    content: ;
  } */

  &.heading-group:active {
    display: block;
  }
`
const HeadingButton = styled.div`
  display: inline-block;
  position: relative;
`
const HeadingGroup = styled.ul`
  position: absolute;
`
const HeadingList = styled.li`
  width: max-content;
`

const Icon = styled(FontAwesomeIcon)``

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null
  }

  return (
    <ButtonGroup>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive('bold')}
      >
        <Icon icon={faBold} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive('italic')}
      >
        <Icon icon={faItalic} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive('strike')}
      >
        <Icon icon={faStrikethrough} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        active={editor.isActive('code')}
      >
        <Icon icon={faCode} />
      </Button>
      <HeadingButton>
        <Button className='heading-group'>
          <Icon icon={faFont} />
        </Button>
        <HeadingGroup>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
            <h1>h1</h1>
          </HeadingList>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            <h2>h2</h2>
          </HeadingList>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
          >
            <h3>h3</h3>
          </HeadingList>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
          >
            <h4>h4</h4>
          </HeadingList>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
            className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
          >
            <h5>h5</h5>
          </HeadingList>
          <HeadingList
            onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
            className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
          >
            <h6>h6</h6>
          </HeadingList>
        </HeadingGroup>
      </HeadingButton>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive('bulletList')}
      >
        <Icon icon={faListUl} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive('orderedList')}
      >
        <Icon icon={faListOl} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive('codeBlock')}
      >
        <Icon icon={faTerminal} />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive('blockquote')}
      >
        <Icon icon={faQuoteLeft} />
      </Button>
    </ButtonGroup>
  )
}

function Editor_TipTap() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World!</p>'
  })

  return (
    <TextArea>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </TextArea>
  )
}

export default Editor_TipTap
