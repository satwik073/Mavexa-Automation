import React from 'react'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Images/External/UI/card'
import { Link } from 'react-router-dom'
import { Label } from '@/Components/Images/External/UI/label'
import { Switch } from '@/Components/ui/switch'



type Props = {
  name: string
  description: string
  id: string
  publish: boolean | null
}

const Workflow = ({ description, id, name, publish }: Props) => {
//   const onPublishFlow = async (event: any) => {
//     const response = await onFlowPublish(
//       id,
//       event.target.ariaChecked === 'false'
//     )
//     if (response) toast.message(response)
//   }

  return (
    <Card className="flex w-[600px] items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <Link to={`/workflows/editor/${id}`}>
          <div className="flex flex-row gap-2">
            <img
              src="/googleDrive.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <img
              src="/notion.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <img
              src="/discord.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
            <img
              src="/slack.png"
              alt="Google Drive"
              height={30}
              width={30}
              className="object-contain"
            />
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </Link>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        <Label
          htmlFor="airplane-mode"
          className="text-muted-foreground"
        >
          {publish! ? 'On' : 'Off'}
        </Label>
        <Switch
          id="airplane-mode"
          // onClick={onPublishFlow}
          defaultChecked={publish!}
        />
      </div>
    </Card>
  )
}

export default Workflow