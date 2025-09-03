'use client'
import { DecodedUser } from "@/lib/auth";
import { error } from "console";
import { redirect } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface Authcon{
    user:User;
    login:(u:User)=>void;
    logout:()=>void;

}
type User= {
    id?:string;
    name?:string;
    email?:string;
    password?:string;
}|null;

const AuthContext = createContext<Authcon|undefined>(undefined)


export const Authprovider = ({children}:{children:React.ReactNode})=>{
    const [user,setUser] = useState<User>(null)
    const [token,setToken] = useState<string|null>(null)

    useEffect(()=>{
        const storedToken = localStorage.getItem("token");
        if (storedToken){
            const check = async ()=>{
                const res = await fetch('/api/auth/verify',{method:"POST",body:JSON.stringify({token:storedToken})})
                const res2 =await res.json()
                setUser(res2.user)
                return (res2)
            }
            // useEffect(()=>{check()},[])
            check()
        }
        else{
        }
    },[])

    const login = async (u:User)=> {
        if (!u?.email && !u?.password) {
            return 'please provide email and password'
        }
        const res = await fetch('/api/auth/login',{
                    method:"POST",
                    body:JSON.stringify({email:u?.email,password:u?.password})
                },
        )
        const response =await res.json()    
        if (response.message=='Login successful') {
            console.log(response.user)
            setUser({
                name: response.user.firstName,
                email:response.user.email,
                id:response.user._id
            })
            setToken(response.token)
            localStorage.setItem('token',response.token)
            console.log('token',response.token)
            redirect('/dashboard')
        }
        else{
            return 'error logging in'
        }
    }
    const logout = ()=>{
        setUser(null)
        localStorage.removeItem('token')
        setToken(null)
        useEffect(()=>{
            redirect('/auth/login')
        },[])
    }

    return <AuthContext.Provider value={{user,login,logout}}>
            {children}
            </AuthContext.Provider>
}


export function useAuth(){
    const context = useContext(AuthContext)
    if(!context) throw new Error("useauth must be used inside AuthProvider")
    return context;
}
