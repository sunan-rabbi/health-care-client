"use client"
import { isLoggedIn } from '@/Service/actions/authservice';
import DashboardDrawer from '@/components/Dashboard/DashboardDrawer/DashboardDrawer';
import { useRouter } from 'next/navigation';
import React from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter()
    if (!isLoggedIn()) {
        return router.push('/login')
    }

    return (
        <DashboardDrawer>
            {children}
        </DashboardDrawer>
    );
};

export default DashboardLayout;