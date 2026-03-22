import { useEffect } from "react"


export const useOutsideClick = (ref,callback,excludeRef)=>{    
    useEffect(()=>{
        function handleOutsideClick (event){
            if(ref.current && !ref.current.contains(event.target) && (!excludeRef?.current || !excludeRef.current.contains(event.target))){
                callback();
            }
        }
        document.addEventListener('mousedown',handleOutsideClick);

        return()=> document.removeEventListener('mousedown',handleOutsideClick)
    },[ref,callback])
}