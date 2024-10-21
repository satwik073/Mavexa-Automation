import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';

// Lazy load SidebarDemo to improve performance
const SidebarDemo = lazy(() => import('@/Globals/GlobalSidebarMenu/SideMenuWrapper/SidebarActionController').then(module => ({ default: module.SidebarDemo })));

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div>
      {/* <Helmet>
       
        <title>Dashboard - User Activity and Performance | Mavexa</title>
        <meta
          name="description"
          content="Access your personalized dashboard on Mavexa to track user activity, performance stats, and analytics. Stay updated with real-time data."
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://mavexa.vercel.app/dashboard" />

        <meta property="og:title" content="Mavexa Dashboard - User Activity and Performance" />
        <meta
          property="og:description"
          content="Stay updated with real-time user activity, performance stats, and analytics on your personalized Mavexa dashboard."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mavexa.vercel.app/dashboard" />
        <meta property="og:image" content="https://mavexa.vercel.app/test2.png" />
        <meta property="og:site_name" content="Mavexa" />

     
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mavexa Dashboard - User Activity and Performance" />
        <meta
          name="twitter:description"
          content="Check your user activity, performance stats, and analytics on Mavexa. Get real-time insights into your dashboard."
        />
        <meta name="twitter:image" content="https://mavexa.vercel.app/test2.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Dashboard - Mavexa",
            "description": "Access your personalized dashboard on Mavexa to track user activity, performance stats, and analytics.",
            "url": "https://mavexa.vercel.app/dashboard",
            "image": "https://mavexa.vercel.app/test2.png",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://my-react-app.com/dashboard"
            }
          })}
        </script>
      </Helmet> */}
      <Helmet>
        <title>Dashboard - User Activity and Performance | Mavexa</title>

        <meta name="description" content="Access your personalized dashboard on Mavexa to track user activity, performance stats, and analytics." />

        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Mavexa - SaaS Automation Solutions for Business Efficiency" />
        <meta property="og:description" content="Transform your business operations with Mavexa's SaaS automation tools. Get insights, automate workflows, and scale efficiently." />
        <meta property="og:image" content="https://mavexa.vercel.app/test2.png" />
        <meta property="og:url" content="https://mavexa.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Mavexa" />
        <meta property="og:locale" content="en_US" />


        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mavexa - Leading SaaS Automation Platform" />
        <meta name="twitter:description" content="Boost your business with Mavexa's leading SaaS automation platform. Automate, optimize, and scale seamlessly with real-time insights." />
        <meta name="twitter:image" content="https://mavexa.vercel.app/test2.png" />
        <meta name="twitter:site" content="@mavexa" />
        <meta name="twitter:creator" content="@mavexa" />

        <meta property="og:title" content="Mavexa - SaaS Automation Platform" />
        <meta property="og:description" content="Streamline your business operations with Mavexa's cutting-edge SaaS automation platform." />
        <meta property="og:image" content="https://mavexa.vercel.app/test2.png" />
        <meta property="og:url" content="https://mavexa.vercel.app" />
        <meta property="og:type" content="website" />


        <meta name="robots" content="index, follow" />
        <meta name="keywords" content="SaaS automation, business automation, workflow automation, streamline business processes, real-time insights, scale business, Mavexa" />

        <link rel="canonical" href="https://mavexa.vercel.app" />
       
      </Helmet>

      {/* Lazy-loaded SidebarDemo component with fallback */}
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <SidebarDemo />
      </Suspense>
    </div>
  );
};

export default Dashboard;
