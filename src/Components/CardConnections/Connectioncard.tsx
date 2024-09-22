
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/Components/Images/External/UI/card'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  type: string,
  icon: string,
  title: string,
  description: string
  callback?: () => void
  connected: {} & any
}

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {
  return (
    <Card className="flex w-full items-center justify-between">
      <CardHeader className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Image
            src={icon}
            alt={title}
            height={30}
            width={30}
            className="object-contain"
          />
        </div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <div className="flex flex-col items-center gap-2 p-4">
        {connected[type] ? (
          <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold text-white">
            Connected
          </div>
        ) : (
          <Link
            href={
              title == 'Discord'
                ? "#"
                : title == 'Notion'
                ?"#"
                : title == 'Slack'
                ?""
                : '#'
            }
            className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
          >
            Connect
          </Link>
        )}
      </div>
    </Card>
  )
}

export default ConnectionCard