import { Button } from '@/components/ui/button';
import Navbar from '@/components/navbar';
import { Sidebar } from 'lucide-react';
import React from 'react'
import Content from '../content/page';



// sidebar , navbar and body content 


const HomePage = () => {
  return (
 <div>
      <Navbar/>
       <Content/>
    </div>
  )
}

export default HomePage;