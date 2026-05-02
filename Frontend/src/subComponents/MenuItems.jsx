import { useState } from "react"
import BackdropPage from "../components/BackdropPage";
import AddNewMenuItem from "../components/AddNewMenuItem";
import MenuItemCard from "./MenuItemCard";

const data = {
    id:1,
    dish_name:'Chicken Thukpa',
    quantity:'half plate',
    price:'60',
    image:'https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png',
    desc:''
}


export default function MenuItems({activeCat,categories}){
    const [openAddItem,setOpenAddItem] = useState(false);
    const [catItems,setCatItems] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    
    return(
        <div className=" flex-1 min-w-0 h-full min-h-0 flex flex-col gap-2 md:gap-3">
            <BackdropPage isOpen={openAddItem} onClose={()=>setOpenAddItem(false)} >
                <AddNewMenuItem onClose={()=>setOpenAddItem(false)} activeCat={activeCat} categories={categories}/>
            </BackdropPage>
            {activeCat&&<div className="w-full flex justify-end">
                <button onClick={()=>setOpenAddItem(true)}
                className="px-3 py-2 w-fit rounded-lg bg-linear-0 flex items-center gap-1 text-center justify-center
                text-[12px] md:text-[13px] lg:text-[14px] font-[600]
                text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600
                shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99 ">Add New Item</button>
            </div>}
            <div className="flex-1 min-h-0 overflow-y-auto show-custom-scrollbar w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-3 xl:gap-4">
                {
                    [1,2,3,4,5,6,7,8,9,10].map(i=>
                        <MenuItemCard data={data} key={i} />
                    )
                }
            </div>
            
        </div>
    )
}