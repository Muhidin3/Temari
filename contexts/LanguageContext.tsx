'use client'
import { createContext, useContext, useState } from "react";

const LangContext = createContext<{language:string,changeLang:(a:"en"|'am')=>void}|undefined>(undefined) 


export function LangProvider({children}:{children:React.ReactNode}){
    const [language,setLanguage] = useState('en')
    const changeLang = async (a:'en'|'am')=>{
        setLanguage(a)
    }
    return (<LangContext.Provider value={{language,changeLang}}>
        {children}
    </LangContext.Provider>)
}

export const useLang = ()=>{
    const context = useContext(LangContext)
    if (!context) throw new Error('components must be wrapped with languageprovider')
    return context
}