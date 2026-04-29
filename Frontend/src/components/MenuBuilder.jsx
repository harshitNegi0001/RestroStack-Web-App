import { useEffect } from "react";
import { useState } from "react"
import { getMenuCategories } from "../Apis/menuApi";
import { MdDragIndicator } from "react-icons/md";
import CategoriesComponent from "../subComponents/CategoriesComponent";




export default function MenuBuilder() {
    const [categories, setCategories] = useState([
        { id: '1', category_name: 'Starters', itemCount: 12 },
        { id: '2', category_name: 'Main Course', itemCount: 25 },
        { id: '3', category_name: 'Breads & Rice', itemCount: 8 },
        { id: '4', category_name: 'Beverages', itemCount: 15 },
        
    ]);
    const [activeCat, setActiveCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(() => {
        // getCategory();
    }, []);

    const getCategory = async () => {
        function successFunction(data) {
            setCategories(data);
        }
        setIsLoading(true);
        await getMenuCategories(successFunction);
        setIsLoading(false);
    }
    return (
        <div className="flex-1 w-full min-h-0 pt-2 px-2 md:pt-4 md:px-2 flex flex-col sm:flex-row gap-2 md:gap-4  show-custom-scrollbar">
            <CategoriesComponent categories={categories} setCategories={setCategories}
                isLoading={isLoading} 
                activeCat={activeCat} setActiveCat={setActiveCat}/>

            <div className="">
                {/* Menu Item */}
            </div>
        </div>
    )
}