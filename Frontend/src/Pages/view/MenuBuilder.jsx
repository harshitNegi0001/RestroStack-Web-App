import { useEffect } from "react";
import { useState } from "react"
import { MdDragIndicator } from "react-icons/md";
import { getMenuCategories } from "../../Apis/menuApi";
import CategoriesComponent from "../../subComponents/CategoriesComponent";
import MenuItems from "../../subComponents/MenuItems";




export default function MenuBuilder() {
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showMobileItems,setShowMobileItems ] = useState(false);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        function successFunction(data) {
            setCategories(data);
            if(data?.length>0){
                setActiveCat(data[0]?.id);
            }
        }
        setIsLoading(true);
        await getMenuCategories(successFunction);
        setIsLoading(false);
    }
    return (
        <div className="flex-1 w-full min-h-0 p-2 md:p-4 flex flex-col sm:flex-row gap-2 md:gap-4 overflow-y-auto show-custom-scrollbar">
            <CategoriesComponent categories={categories} setCategories={setCategories}
                isLoading={isLoading} showMobileItems={showMobileItems} setShowMobileItems={setShowMobileItems}
                activeCat={activeCat} setActiveCat={setActiveCat} />

            <MenuItems  activeCat={activeCat} 
            categories={categories} setCategories={setCategories}
            showMobileItems={showMobileItems} setShowMobileItems={setShowMobileItems}/>
        </div>
    )
}