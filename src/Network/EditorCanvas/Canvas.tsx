import { ConnectionsProvider } from '@/providers/ConnectionsProvider'
import EditorProvider from '@/providers/EditorProvider'
import React from 'react'
import EditorCanvas from './Components/EditorCanvas'

type Props = {}

const Canvas = (props: Props) => {
  return (
    <div className='h-full w-full'>
        <EditorProvider>
            <ConnectionsProvider>
                <EditorCanvas/>
            </ConnectionsProvider>
        </EditorProvider>
    </div>
  )
}

export default Canvas