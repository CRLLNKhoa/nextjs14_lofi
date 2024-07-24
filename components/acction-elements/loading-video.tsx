import React from 'react'

function LoadingVideo() {
  return (
    <div className='bg-black/80 z-50 select-none fixed top-0 left-0 w-full h-full flex items-center justify-center'>
        <img src="/svgs/loading.svg" alt="loading" className='animate-spin' />
    </div>
  )
}

export default LoadingVideo