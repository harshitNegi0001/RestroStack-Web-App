import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiArmchairLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import BackdropPage from "./BackdropPage";
import CreateTableZone from "../subComponents/CreateTableZone";
import { useEffect } from "react";
import { getTableZones } from "../Apis/tablesApi";

const tables = [
    {
        id: 1,
        zone_name: 'Indoor',
        hourly_charge: 0,
        tables: 50

    },
    {
        id: 2,
        zone_name: 'Outdoor',
        tables: 30,
        hourly_charge: '0',

    },
    {
        id: 3,
        zone_name: 'Rooftop',
        tables: 90,
        hourly_charge: '100',

    },

]

export default function TableSetupPage() {
    const [openCreateTable, setOpenCreateTable] = useState(false);
    const [openEditZone, setOpenEditZone] = useState({
        isOpen: false,
        editData: {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const [tableZones, setTableZones] = useState([]);

    useEffect(() => {
        getZones();
    }, [])

    const getZones = async () => {
        function successFunction(data) {
            setTableZones
        }
        setIsLoading(true);
        await getTableZones(successFunction);
        setIsLoading(false);
    }
    return (
        <div className="bg-card-bg rounded-2xl p-2 md:p-3 w-full mt-4 flex flex-col gap-3 shadow-md">
            <BackdropPage isOpen={openCreateTable} onClose={() => setOpenCreateTable(false)} >
                <CreateTableZone onClose={() => setOpenCreateTable(false)} type="create" />
            </BackdropPage>
            <BackdropPage isOpen={openEditZone?.isOpen} onClose={() => setOpenEditZone({ isOpen: false, editData: {} })} >
                <CreateTableZone onClose={() => setOpenEditZone({ isOpen: false, editData: {} })} type="edit" editData={openEditZone?.editData} />
            </BackdropPage>
            <div className=" p-2 md:p-3  flex flex-col w-full gap-2">
                <div className="text-[14px] md:text-[16px] text-sec-text">
                    Seating Zones
                </div>
                {isLoading ?
                    <div></div>
                    : tableZones.map(t =>
                        <div key={t.id}
                            className="w-full flex p-2 items-center gap-2 rounded-2xl bg-toast-bg/70 hover:bg-toast-bg active:bg-toast-bg">
                            <div
                                className="flex justify-center items-center bg-active-border/30 p-2 text-[20px] rounded-lg text-active-border">
                                <RiArmchairLine />
                            </div>
                            <div
                                className="flex flex-1 min-w-0 flex-col ">
                                <span className="text-main-text text-[14px] capitalize w-full truncate">
                                    {t.zone_name}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] md:text-[12px] text-low-text/70 w-full truncate">
                                    <span>
                                        {t.tables} tables
                                    </span>.
                                    {t.hourly_charge && <span>
                                        ${t.hourly_charge}/hr
                                    </span>}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 ">
                                <div onClick={() => setOpenEditZone({ isOpen: true, editData: t })}
                                    className="text-[14px] text-sec-text/70 hover:text-sec-text active:text-sec-text hover:bg-divider/40 p-1.5 rounded-2xl">
                                    <LuPencil />
                                </div>
                                <div className="text-[14px] text-red-600/70 hover:text-red-600 active:text-red-600 hover:bg-divider/40 p-1.5 rounded-2xl">
                                    <RiDeleteBin5Line />
                                </div>
                            </div>
                        </div>
                    )}

                <div className="w-full flex justify-center ">
                    <button onClick={() => setOpenCreateTable(prev => !prev)}
                        className={` mt-3 px-3 py-2 w-fit rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center gap-1 text-center justify-center
                            text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99`}>
                        <IoMdAdd /> Create Table Zone
                    </button>
                </div>
            </div>
        </div>
    )
}