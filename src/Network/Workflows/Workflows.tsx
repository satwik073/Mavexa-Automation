'use client'
import CustomModal from '@/Components/CustomModal/CustomModal'
import WorkflowForm from './Components/WorkflowForms'
import { Button } from '@/Components/Images/External/UI/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { useModal } from '@/providers/ModalValueProvider'
import Workflow from './Components/Rendering'
import CustomBox from '@/@types/Comp_BX'

type Props = {}

const WorkflowButton = (props: Props) => {
  const { setOpen, setClose } = useModal()
  const credits: number = 1

  const handleClick = () => {
    console.log('run')
    setOpen(

      <CustomModal
        title="Create a Workflow Automation"
        subheading="Workflows are powerful tools that help you automate tasks."
      >
        <WorkflowForm />
      </CustomModal>
    )
  }

  return (
    <CustomBox >

    <Button
      size="icon"
      onClick={credits > 0 ? handleClick : undefined}
      disabled={credits <= 0}
    >
      <Plus />
     
    </Button>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus facilis quo eius eveniet veritatis voluptas aliquam odio est ex repellendus.'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    <Workflow name={'Test'} description={'Testing things'} id={'1'} publish={null}/>
    </CustomBox>
  )
}

export default WorkflowButton
