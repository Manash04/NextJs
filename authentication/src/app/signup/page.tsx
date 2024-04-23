import React, { useState } from 'react'

function SignupPage() {
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:""
    })
    const [buttonDisable, seButtonDisable] = useState(false)
    const [loading, setLoading]= useState(false)
  return (
    <div>SignupPage</div>
  )
}

export default SignupPage