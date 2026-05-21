import { useEffect } from "react";
import { useState } from "react"
import { MdDragIndicator } from "react-icons/md";
import { getMenuCategories } from "../../Apis/menuApi";
import CategoriesComponent from "../../subComponents/CategoriesComponent";
import MenuItems from "../../subComponents/MenuItems";
import { useSelector } from "react-redux";




export default function MenuBuilder() {
    const [activeCat, setActiveCat] = useState(null);
    const [showMobileItems,setShowMobileItems] = useState(false);

    
    return (
        <div className="flex-1 w-full min-h-0 p-2 md:p-4 flex flex-col sm:flex-row gap-2 md:gap-4 overflow-y-auto show-custom-scrollbar">
            <CategoriesComponent showMobileItems={showMobileItems} 
                setShowMobileItems={setShowMobileItems}
                activeCat={activeCat} setActiveCat={setActiveCat} />

            <MenuItems  activeCat={activeCat} 
            showMobileItems={showMobileItems} setShowMobileItems={setShowMobileItems}/>
        </div>
    )
}