// import { useState, useEffect } from "react";

// export function useUser(){
//     const [userInfo, setUserInfo] = useState({
//         auth: null,
//         user: null,
//         isPending: true
//     })

//     useEffect(()=>{
//         if(!('userInfo' in sessionStorage)){
//             // fetch(`http://localhost:2500/api/auth/user`, {method: 'POST', credentials: 'include'})
//             fetch(`https://bioclock.onrender.com/api/auth/user`, {method: 'POST', credentials: "include"})
//             .then(res=>{
//                     if(!res.ok){
//                         throw Error('could not check user authentication')
//                     }
//                     return res.json()
//                 })
//                 .then(data => {
//                     setUserInfo({auth: data.auth, user: data.user, isPending: false})
//                     sessionStorage.setItem('userInfo', JSON.stringify({auth: data.auth, user: data.user}))
//                 })
//                 .catch(err => {
//                     setUserInfo({auth: null, user: null})
//                     console.log(err.message)
//                 })
//         }else{
//             let storedUserInfo = sessionStorage.getItem('userInfo');
//             setUserInfo({...JSON.parse(storedUserInfo), isPending: false});
//         }
//     }, [])

//     return userInfo;
// } 

import { useState, useEffect } from "react";

export function useUser() {
    const [userInfo, setUserInfo] = useState({
        auth: null,
        user: null,
        isPending: true,
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (!('userInfo' in sessionStorage)) {
                    const response = await fetch('https://bioclock.onrender.com/api/auth/user', {
                        method: 'POST',
                        credentials: 'include',
                    });
                    if (!response.ok) {
                        throw new Error('could not check user authentication');
                    }
                    const data = await response.json();
                    setUserInfo({ auth: data.auth, user: data.user, isPending: false });
                    sessionStorage.setItem('userInfo', JSON.stringify({ auth: data.auth, user: data.user }));
                } else {
                    const storedUserInfo = sessionStorage.getItem('userInfo');
                    setUserInfo({ ...JSON.parse(storedUserInfo), isPending: false });
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        fetchUserInfo(); // Call the function immediately

    }, []); // Empty dependencies array ensures it runs once on mount

    return userInfo;
}
