import { AnalyticsScripts } from "@/components/analytics-scripts";
import { BottomActionBar } from "@/components/bottom-action-bar";
import { Footer } from "@/components/footer";
import { TopNav } from "@/components/top-nav";
import { getSiteSettings } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";
import { THEME_BOOTSTRAP_SCRIPT } from "@/lib/theme";

import "./globals.css";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return createMetadata(settings.seo.title, settings.seo.description, "/", settings.seo.image);
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const settings = await getSiteSettings();

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {gscVerification ? <meta name="google-site-verification" content={gscVerification} /> : null}
        <script
          dangerouslySetInnerHTML={{
            __html: THEME_BOOTSTRAP_SCRIPT,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <AnalyticsScripts />
        <TopNav whatsappNumber={settings.whatsappNumber} />
        <main className="mx-auto w-full max-w-7xl px-4 py-8 pb-24 sm:px-6 lg:px-8 md:pb-8">{children}</main>
        <BottomActionBar whatsappNumber={settings.whatsappNumber} />
        <Footer />
      </body>
    </html>
  );
}
