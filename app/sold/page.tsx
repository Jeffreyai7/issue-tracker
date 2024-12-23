import React from 'react'

const page = ({searchParams}: {searchParams: {status : string}}) => {
 console.log("hi :", searchParams.status)
  return (
    <div>
        Sign in
    </div>
  )
}

export default page