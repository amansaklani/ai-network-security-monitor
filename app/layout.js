import "./globals.css";

export const metadata = {
  title: "AI Network Security Monitor",
  description: "Real-time AI-powered network threat detection",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased selection:bg-primary/30" suppressHydrationWarning>
        <div className="scan-line" />
        <main className="min-h-screen relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
