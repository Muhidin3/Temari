export default function Afetch(url:string,options:RequestInit={}){
    const token = localStorage.getItem('token')
    if (!token) throw new Error("No Auth Token")
    
    const headers = {
        ...options.headers,
        authorization:`Bearer ${token}`
    }
    const res = fetch(url,{...options,headers})

    return res


}