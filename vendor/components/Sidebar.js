import { useState } from "react";
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import TuneIcon from '@mui/icons-material/Tune';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { logout } from '@auth0/nextjs-auth0';
import Link from 'next/link';

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const router = useRouter();

    return (
        <>
            {showSidebar ? (
                <button
                    className="flex text-4xl text-white items-center cursor-pointer fixed left-5 top-6 z-50"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    <ArrowBackIosIcon />
                </button>
            ) : (
                <button onClick={() => setShowSidebar(!showSidebar)} className="fixed flex z-50 left-5 top-6">
                    <MenuIcon className="mt-2" fontSize="large" />
                    <img src='/logo2.png' className="ml-4 pl-1 pr-0.5 bg-black  w-40 h-15" alt="logo2" />
                </button>
            )}

            <div
                className={`top-0 left-0 w-[20vw] bg-black  p-10 pl-10 text-white fixed h-full z-40  ease-in-out duration-300 ${showSidebar ? "translate-x-0 " : "-translate-x-full"
                    }`}
            >
                <img src='/logo.png' className="left-5 w-70 h-70" alt="logo" />
                <br />

                <button
                    className="text-xl text-white pl-7 pb-3"
                    onClick={() => router.push('/orders')}
                >
                    <WidgetsOutlinedIcon fontSize="medium" /> Orders
                </button>
                <button
                    className="text-xl text-white pl-7 pb-3"
                    onClick={() => router.push('/menu')}
                >
                    <TuneIcon fontSize="medium" /> Edit Menu
                </button>
                <button className="text-xl  text-white pl-7 pb-3"><AnalyticsOutlinedIcon fontSize="medium" /> Analytics</button>
                <button className="text-xl  text-white pl-7 pb-3"><CurrencyRupeeOutlinedIcon fontSize="medium" /> Revenue</button>
                <button className="text-xl  text-white pl-7 pb-10"><HistoryOutlinedIcon fontSize="medium" /> History</button>

                <hr />
                <br />
                <Link href="/api/auth/logout">
                    <button className="text-xl  text-white pl-8 pb-10">
                        <LogoutOutlinedIcon fontSize="medium" /> Logout
                    </button>
                </Link>

            </div>
        </>
    );
};

export default Sidebar;