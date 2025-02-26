import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
import Footer from "../components/footer"
import GridLines from 'react-gridlines';


const Layout = () => {
    return (
        <div className="w-full min-h-screen bg-[#0B0D11] text-white !font-roboto">
            <GridLines className="grid-area"  cellWidth={120} strokeWidth={0.1} >
            <Navbar />
                <main className="w-full min-h-screen">
                    <Outlet />
                </main>
            </GridLines>
            <Footer />
        </div>
    )
}

export default Layout
