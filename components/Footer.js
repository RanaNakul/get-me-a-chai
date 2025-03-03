import React from 'react'

const Footer = () => {

  const currentYear = new Date().getFullYear()

  return (
    <footer className=' bg-[#00091dea] text-white text-xs text-center md:text-sm py-5 '>
    
        <p>Copyright &copy; {currentYear} Get Me a Chai - All rights reserved! </p>
        
    </footer>
  )
}

export default Footer