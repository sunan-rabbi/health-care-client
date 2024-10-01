import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/NavBar/Navbar";
import React from "react";


const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default CommonLayout;