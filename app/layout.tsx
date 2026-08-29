import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Helm — Client Intelligence',
  description:
    'A premium B2B client dashboard for analytics, metrics, and customer database management.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-background font-sans antialiased" suppressHydrationWarning>
        <Script id="strip-fdprocessedid" strategy="beforeInteractive">
          {`(function(){try{var a="fdprocessedid";function s(n){if(n&&n.removeAttribute)n.removeAttribute(a)}var o=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)if(ms[i].attributeName===a)s(ms[i].target)});o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:[a]});if(document.querySelectorAll)document.querySelectorAll("["+a+"]").forEach(s);setTimeout(function(){o.disconnect()},4000)}catch(e){}})();`}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
