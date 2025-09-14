'use client'
import { createContext, ReactNode, useContext, useState } from "react";

interface notifyType{
    notify:(message:string,type?:'info' | 'sucess' | 'warning' | 'error')=>void
}

const notificationContext = createContext<notifyType | undefined>(undefined)



export const NotificationProvider = ({children}:{children:ReactNode})=>{
    const [message,seMessage] = useState('no notificaton')
    const [open,setOpen] = useState(false)
    const notify = (message:string,type?:'info' | 'sucess' | 'warning' | 'error')=>{
        seMessage(message)
        setOpen(true);
        setTimeout(() => { 
            setOpen(false)
        }, 3000);
    }

    return <notificationContext.Provider value={{
            notify
    }}>
                {children}
                {open &&
                <div 
                className="fixed z-[21453567] top-10 left-1/2 -translate-x-1/2 
                rounded-xl bg-white text-black dark:bg-slate-800 dark:text-gray-500 border-4 border-green-400">
                    <div className="dark:text-white p-10 text-lg bg-green-400 ">
                        {message}
                    </div>
                </div>

                }
                
            </notificationContext.Provider>

}

export function useNotify() {
  const context = useContext(notificationContext)
  if (context === undefined) {
    throw new Error("useNotify must be used within an AuthProvider")
  }
  return context
}
