import { useState } from 'react';

export function useCart(){
   const [openCart, setOpenCart] = useState(true);
   return {
        openCart,
        setOpenCart
   } 
}