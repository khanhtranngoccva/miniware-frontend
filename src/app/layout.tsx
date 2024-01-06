import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import React from "react";
import MainLayout from "@/components/MainLayout";
import TabsProvider from "@/components/TabsProvider";
import {NextIntlClientProvider} from "next-intl";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Miniware',
    description: 'A mini malware analysis web server',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <TabsProvider>
            <MainLayout>
                {children}
            </MainLayout>
        </TabsProvider>
        </body>
        </html>
    );
}
