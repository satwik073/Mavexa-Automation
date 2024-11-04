import { ConnectionProviderProps } from '@/providers/ConnectionsProvider'
import { EditorState } from '@/providers/EditorProvider'
import { useMavexaStore } from '@/Hooks/useGlobal'
import React from 'react'
import ContentBasedOnTitle from '@/@molecules/Content/ContentBased'

type Props = {
  state: EditorState
  nodeConnection: ConnectionProviderProps
}

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useMavexaStore()
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  )
}

export default RenderOutputAccordion