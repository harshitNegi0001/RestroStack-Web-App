import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { RiArmchairLine } from "react-icons/ri";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import BackdropPage from "./BackdropPage";
import CreateTableZone from "../subComponents/CreateTableZone";
import { useEffect } from "react";
import { deleteZones, getTableZones } from "../Apis/tablesApi";
import ConfirmBox from "../subComponents/ConfirmBox";


const res_currency ='₹'
export default function TableSetupPage() {
    const [openCreateTable, setOpenCreateTable] = useState(false);
    const [openEditZone, setOpenEditZone] = useState({
        isOpen: false,
        editData: {}
    });
    const [isLoading, setIsLoading] = useState(false);
    const [tableZones, setTableZones] = useState([]);
    const [delLoading, setDelLoading] = useState(false);
    const [openConfirm, setOpenConfirm] = useState({
        isOpen: false,
        data: {}
    });
    useEffect(() => {
        getZones();
    }, [])

    const getZones = async () => {
        function successFunction(data) {
            setTableZones(data);
        }
        setIsLoading(true);
        await getTableZones(successFunction);
        setIsLoading(false);
    }
    const handleDelete = async (data) => {
        const zoneId = data?.zoneId;
        if (!zoneId) return;
        function successFunction() {
            setTableZones(prev => ([...prev.filter(t => t.id != zoneId)]));
            setOpenConfirm({ isOpen: false, data: {} });
        }

        setDelLoading(true);
        await deleteZones(zoneId, successFunction);
        setDelLoading(false);
    }
    return (
        <div className="bg-card-bg rounded-2xl p-2 md:p-3 w-full mt-4 flex flex-col gap-3 shadow-md">
            <BackdropPage isOpen={openCreateTable} onClose={() => setOpenCreateTable(false)} >
                <CreateTableZone onClose={() => setOpenCreateTable(false)} type="create" setTableZones={setTableZones} />
            </BackdropPage>
            <BackdropPage isOpen={openEditZone?.isOpen} onClose={() => setOpenEditZone({ isOpen: false, editData: {} })} >
                <CreateTableZone onClose={() => setOpenEditZone({ isOpen: false, editData: {} })} type="edit" editData={openEditZone?.editData} setTableZones={setTableZones} />
            </BackdropPage>
            <BackdropPage isOpen={openConfirm?.isOpen} onClose={() => setOpenConfirm({ isOpen: false, data: {} })} >
                <ConfirmBox title={'Are your sure to delete'} confirmFunction={handleDelete} type={'error'} data={openConfirm?.data} onCancel={()=>setOpenConfirm({ isOpen: false, data: {} })} loadingBtn={delLoading} desc={'Tables in this zone will also removed.'} />
            </BackdropPage>
            <div className={`p-2 md:p-3  flex flex-col w-full gap-2 `}>
                <div className="text-[14px] md:text-[16px] text-sec-text">
                    Seating Zones
                </div>
                {isLoading ?
                    <div className="w-full flex mask-bottom-fade flex-col gap-2 sm:gap-3">
                        {[1, 2, 3, 4].map(i =>
                            <div key={i} className="w-full flex p-2 items-center gap-2 rounded-2xl bg-toast-bg animate-pulse">
                                <div className="bg-active-border/30 size-[40px] rounded-lg ">
                                </div>
                                <div
                                    className="flex flex-1 min-w-0 flex-col gap-1.5">
                                    <span className="h-[14px] rounded-lg w-[150px] animate-wave">
                                    </span>
                                    <div className="flex items-center gap-1 text-[11px] md:text-[12px] text-low-text/70 w-full truncate">
                                        <span className="h-[11px] md:h-[12px] w-[60px] rounded-lg animate-wave">
                                        </span>
                                        <span className="h-[11px] md:h-[12px] w-[60px] rounded-lg animate-wave">
                                        </span>
                                    </div>
                                </div>
                            </div>)}
                    </div> :
                    tableZones.length === 0 ?
                        <div className="w-full flex flex-col items-center py-[20px]">
                            <img src="https://res.cloudinary.com/dns5lxuvy/image/upload/v1776824800/uppdvvhqrps5hgxpnpwf.png" alt=""
                                className="w-full max-w-[320px] sm:max-w-[400px] object-contain" />
                            <div className="pt-2 text-center text-main-text text-[16px] sm:text-[18px] font-[600]">
                                No Seating Zones Yet
                            </div>
                            <div className="text-center text-low-text/70 text-[11px] sm:text-[13px] ">
                                It looks like you haven't added any table zones to this restaurant. Click the button below to get started.
                            </div>
                        </div>
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
                                            {t.table_count} tables
                                        </span>•
                                        {t.hourly_charge && <span>
                                            {res_currency}{t.hourly_charge}/hr
                                        </span>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 ">
                                    <div onClick={() => setOpenEditZone({ isOpen: true, editData: t })}
                                        className="text-[14px] text-sec-text/70 hover:text-sec-text active:text-sec-text hover:bg-divider/40 p-1.5 rounded-2xl">
                                        <LuPencil />
                                    </div>
                                    <div onClick={() => setOpenConfirm({ isOpen: true, data: { zoneId: t.id } })}
                                        className="text-[14px] text-red-600/70 hover:text-red-600 active:text-red-600 hover:bg-divider/40 p-1.5 rounded-2xl">
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