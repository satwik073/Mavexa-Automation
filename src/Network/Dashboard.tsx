
import { SidebarDemo } from '@/Globals/GlobalSidebarMenu/SideMenuWrapper/SidebarActionController'
import { Helmet } from 'react-helmet-async'


type Props = {}

const Dashboard = (props: Props) => {
  return (
   <div>
    <Helmet>
                {/* Standard Meta Tags */}
                <title>Dashboard - Mavexa</title>
                <meta name="description" content="This is my React app" />
                <meta name="robots" content="index,follow" />
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="My React App Title" />
                <meta property="og:description" content="Description of my React app" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://my-react-app.com" />
                <meta property="og:image" content="https://my-react-app.com/my-image.jpg" />
                <meta property="og:site_name" content="My React App" />

                {/* Twitter Cards Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="My React App Title" />
                <meta name="twitter:description" content="Description of my React app" />
                <meta name="twitter:image" content="https://my-react-app.com/my-image.jpg" />
            </Helmet>
    <SidebarDemo/>
   </div>
  )
}

export default Dashboard