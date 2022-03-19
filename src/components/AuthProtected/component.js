import React from 'react'
import { useSession } from 'next-auth/react'

export default function AuthProtected({children}){
  const {data, status} = useSession({required: true});

  if(data?.user){
    return children;
  }

  return (
    <div>
      <p>Loading ...</p>
    </div>
  )
}