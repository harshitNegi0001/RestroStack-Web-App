


export default function BackdropPage ({isOpen,onClose,children}){
    if(!isOpen){
        return null
    }
    return(
        <div
        onClick={onClose}
         className="w-[100dvw] h-[100dvh] fixed inset-0 z-[1000] bg-low-text/5 backdrop-blur-[2px]
        flex justify-center items-center">
            <div onClick={(e)=>e.stopPropagation()}
                className="w-fit h-fit">
                    {children}
            </div>
        </div>
    )
}