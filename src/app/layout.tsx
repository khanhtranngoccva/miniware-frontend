import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import "@/helpers/patches";
import React from "react";
import MainLayout from "@/components/MainLayout";
import TabsProvider from "@/components/TabsProvider";
import {NextIntlClientProvider} from "next-intl";
import UIProviders from "@/components/UIProviders";

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
    <UIProviders>
      <TabsProvider>
        <MainLayout>
          {children}
        </MainLayout>
      </TabsProvider>
    </UIProviders>
    </body>
    </html>
  );
}
