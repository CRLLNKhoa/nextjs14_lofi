"use client"
import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { FaSun } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";

function ToogleTheme() {
    const [toogle,setToogle] = useState(false)
  return (
    <div onClick={() => setToogle(!toogle)} className={cn('absolute z-30 rounded-full bottom-2 left-4 w-[72px] h-8 cursor-pointer flex items-center px-2 justify-between transition-all duration-1000',
        toogle ? 'bg-sky-600' : 'bg-bgelement'
    )}>
        <FaSun className='text-white' />
        <FaMoon className='text-white' />
        <div className={cn('absolute bg-white w-6 h-6 rounded-full transition-all right-1 top-1 bottom-1 duration-500',
            toogle ? 'translate-x-[0px]' : '-translate-x-[40px]'
        )}></div>
    </div>
  )
}

export default ToogleTheme