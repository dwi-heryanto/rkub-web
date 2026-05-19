import { AnalyticsScripts } from "@/components/analytics-scripts";
import { Navbar } from "@/components/navbar";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

import "./globals.css";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return createMetadata(settings.seo.title, settings.seo.description, "/", settings.seo.image);
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {gscVerification ? <meta name="google-site-verification" content={gscVerification} /> : null}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('rkub-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.dataset.theme='dark'}}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-bg)] text-[var(--color-text)]">
        <AnalyticsScripts />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
        <WhatsAppFab />
      </body>
    </html>
  );
}
