'use client'

import { createContext, useContext, useState } from "react";

const SIDEBAR_WIDTH_EXPANDED = 18.75;
const SIDEBAR_WIDTH_MINIMIZED = 5.5;

export type LayoutContext = {
    sidebarWidth: number;
    toggleSidebar: () => void;
    sidebarMinimized: boolean;
}

const LayoutContext = createContext<LayoutContext>({
    sidebarWidth: SIDEBAR_WIDTH_EXPANDED,
    toggleSidebar: () => { },
    sidebarMinimized: false,
});

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const [sidebarMinimized, setSidebarMinimized] = useState(false);

    const toggleSidebar = () => {
        setSidebarMinimized((prevIsSidebarMinimized) => !prevIsSidebarMinimized);
    }

    return (
        <LayoutContext.Provider value={{ sidebarWidth: sidebarMinimized ? SIDEBAR_WIDTH_MINIMIZED : SIDEBAR_WIDTH_EXPANDED, toggleSidebar, sidebarMinimized }}>
            {children}
        </LayoutContext.Provider>
    );
}

const useLayout = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}

export { LayoutProvider, useLayout };
