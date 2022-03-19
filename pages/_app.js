import { SessionProvider } from "next-auth/react"

import AuthProtected from '../src/components/AuthProtected'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {Component.protected ? (
        <AuthProtected>
          <Component {...pageProps} />
        </AuthProtected>
      ): (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}