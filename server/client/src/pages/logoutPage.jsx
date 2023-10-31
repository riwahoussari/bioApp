import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"

export default function LogoutPage(){
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    useEffect(()=>{
        setError(false)
        setLoading(true)
        fetch('https://bioclock.onrender.com/api/auth/logout', {
          method: "POST",
          credentials: "include"
      }).then(res => {
        if(!res.ok){
          setLoading(false)
          throw Error("Server response not ok. Please try again")
        }
          return res.json()
      }).then(res => {
          setLoading(false)
          if(res.success){
            sessionStorage.setItem('userInfo', JSON.stringify({auth: false}))
            navigate('../', {replace: true})
          }else{
            throw Error(res.message)
          }
      }).catch(err => {setLoading(false);setError(err.message)})
  
    },[])

    return  (<>
    <header data-bs-theme="dark">
    <div className="navbar navbar-dark bg-dark shadow-sm" style={{position: 'fixed', zIndex: '100', top: '0', width: '100%', height: '60px', justifyContent: 'center'}}>
      <div >
        <Link to="../" className="navbar-brand d-flex align-items-center m-0">
          <strong>Biological Clock</strong>
        </Link>
      </div>
    </div>
  </header>    
    <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="text-center">
        {loading && <p className="fs-3">Logging you out...</p> }   
        {error && <p className="fs-3">{error}</p> }   
    </div>
    </div></>)
}