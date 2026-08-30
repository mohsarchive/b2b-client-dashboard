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
  colorScheme: 'light dark',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="bg-background font-sans antialiased" suppressHydrationWarning>
        <Script id="strip-fdprocessedid" strategy="beforeInteractive">
          {`(function(){try{var a="fdprocessedid";function s(n){if(n&&n.removeAttribute)n.removeAttribute(a)}var o=new MutationObserver(function(ms){for(var i=0;i<ms.length;i++)if(ms[i].attributeName===a)s(ms[i].target)});o.observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:[a]});if(document.querySelectorAll)document.querySelectorAll("["+a+"]").forEach(s);setTimeout(function(){o.disconnect()},4000)}catch(e){}})();`}
        </Script>
        <Script id="helm-time-of-day-theme" strategy="afterInteractive">
          {`(function(){try{var root=document.documentElement;var setTheme=function(){var h=new Date().getHours();var dark=h>=18||h<6;root.classList.toggle('dark',dark);root.classList.toggle('light',!dark)};setTheme();var now=new Date();var next=new Date(now);var hour=now.getHours();var targetHour=hour<6?6:hour<18?18:30;next.setHours(targetHour,0,0,0);if(next<=now){next.setDate(next.getDate()+1);next.setHours(targetHour===6?6:18,0,0,0)}window.setTimeout(function(){setTheme();window.setInterval(setTheme,60000)},Math.max(1000,next.getTime()-now.getTime()))}catch(e){}})();`}
        </Script>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
