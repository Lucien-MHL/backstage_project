import React from 'react'
import VerifyLayout from '../components/VerifyLayout.jsx'
import Editor_Slate from '../components/Editor_Slate.jsx'
import Editor_TipTap from '../components/Editor_TipTap.jsx'

const TextEditorArr = [<Editor_Slate />, <Editor_TipTap />]

function Bulletin() {
  return <VerifyLayout>{TextEditorArr[1]}</VerifyLayout>
}

export default Bulletin
