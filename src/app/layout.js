// src/app/layout.js
import './globals.css';
import NavBar from './NavBar';
import SessionProviderWrapper from './SessionProviderWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <NavBar />
          <main className="p-5">{children}</main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}