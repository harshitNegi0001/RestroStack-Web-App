



export default function ChipComponent ({onClick,activeColor='bg-active-border text-white',classes='',isActive=false,title=''}){
    return(
        <div onClick={onClick}
         className={`${isActive?activeColor:'text-low-text '} py-0.25 px-2 rounded-2xl text-[11px] md:text-[12px] capitalize cursor-pointer`}>
            {title}
        </div>
    )
}