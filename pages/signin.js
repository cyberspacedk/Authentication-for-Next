import { getCsrfToken, getProviders, signIn, getSession } from "next-auth/react"

export default function SignIn({ csrfToken, providers, ...r }) {
  return (
    <> 
    <p>Sign in using connected providers</p>
      <div className="">
        {Object.values(providers).map((provider) => {
          if(provider.name === 'Email') {
            return (
              <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                  Email address
                  <input type="email" id="email" name="email" />
                </label>
                <button type="submit">Sign in with Email</button>
              </form>
            )
          }
          return (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export async function getServerSideProps({req, ...restCtx}) {
  const session = await getSession({ req });
  
  if(session){
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  const csrfToken = await getCsrfToken(restCtx);
  const providers = await getProviders();

  return {
    props: { csrfToken, providers },
  }
}