import { useEffect } from "react";
import { useState } from "react"
import { MdDragIndicator } from "react-icons/md";
import { getMenuCategories } from "../../Apis/menuApi";
import CategoriesComponent from "../../subComponents/CategoriesComponent";




export default function MenuBuilder() {
    const [categories, setCategories] = useState([]);
    const [activeCat, setActiveCat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingBtn, setLoadingBtn] = useState(false);

    useEffect(() => {
        getCategory();
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
        <div className="flex-1 w-full min-h-0 p-2 md:p-4 flex flex-col sm:flex-row gap-2 md:gap-4  show-custom-scrollbar">
            <CategoriesComponent categories={categories} setCategories={setCategories}
                isLoading={isLoading} 
                activeCat={activeCat} setActiveCat={setActiveCat}/>

            <div className="">
                {/* Menu Item */}
            </div>
        </div>
    )
}