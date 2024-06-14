import { HomeIcon } from '@heroicons/react/24/solid';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon height={20} width={20} />,  // Render the icon component
        link: "/"
    },
    {
        title: "Dashboard",
        icon: null,  // Handle the absence of an icon
        link: "/dashboard"
    },
    {
        title: "Home",
        icon: <HomeIcon height={20} width={20} />,  // Render the icon component
        link: "/"
    }
];
