import { useSelector } from 'react-redux';
import TableTypeSelector from '../../components/TableTypeSelector';
import TableView from '../../components/TablesView';
import { useEffect, useState } from 'react';
import { getTables } from '../../Apis/tablesApi';
import MainPagesHeader from '../../components/MainPagesHeader';
import BackdropPage from '../../components/BackdropPage';
import AddNewTable from '../../components/AddNewTable';
import NoDataIcon from '../../utils/illustrations/NoData';
import WaiterOrdersPage from '../../subComponents/WaiterOrdersPage';
import { LuHandPlatter } from "react-icons/lu";
import socket from '../../utils/websocket/socket ';



export default function LiveTable() {

    const { role, permissions } = useSelector(state => state.auth);
    const [isLoading, setIsLoading] = useState(false);
    const [zonesList, setZonesList] = useState([]);
    const [activeZone, setActiveZone] = useState();
    const [tablesList, setTablesList] = useState()
    const [openMyOrders, setOpenMyOrders] = useState(false);

    useEffect(() => {
        getZones();

    }, []);
    useEffect(() => {
        if (activeZone) {
            const active = zonesList?.find(z => z.id == activeZone);
            setTablesList(active?.tables_array);


            socket.on('table_status_change', ({ zone_id, table_id, new_status }) => {

                if (zone_id && table_id && new_status) {

                    const updatedList = zonesList.map(z => (z.id == zone_id) ? {
                        ...z,
                        tables_array: z?.tables_array?.map(t => (t.id == table_id) ? {
                            ...t, status: new_status
                        } :
                            t
                        )
                    } :
                        z)


                    setZonesList(updatedList);
                    if (activeZone == zone_id) {
                        const active = updatedList?.find(z => z.id == activeZone);
                        setTablesList(active?.tables_array);
                    }
                }

            })
        }
    }, [activeZone])

    const getZones = async () => {
        function successFunction(data) {
            setZonesList(data);
            setActiveZone(data?.[0]?.id)
        }

        setIsLoading(true);
        await getTables(successFunction);
        setIsLoading(false);
    }

    return (
        <div className="w-full h-full p-2 md:p-4 flex flex-col gap-2 md:gap-4 items-center overflow-y-auto show-custom-scrollbar">

            <MainPagesHeader
                pageHeading={'Live Tables'} tagline={'Manage live tables and fast-track customer orders.'}
                containBtn={(role == 'owner' || permissions?.['can_manage_table']) && zonesList?.length > 0} btnData={{ iconStart: <LuHandPlatter />, text: 'My Orders', onClick: () => { setOpenMyOrders(true) } }} />
            <BackdropPage isOpen={openMyOrders} onClose={() => setOpenMyOrders(false)} >
                <WaiterOrdersPage onClose={() => setOpenMyOrders(false)} />
            </BackdropPage>
            {isLoading || zonesList?.length > 0 ?
                <>
                    <TableTypeSelector zonesList={zonesList} activeZone={activeZone} setActiveZone={setActiveZone} isLoading={isLoading} />
                    {
                        tablesList?.length > 0 ?
                            <TableView tablesList={tablesList} isLoading={isLoading} zone_id={activeZone} /> :
                            <div className="w-full flex flex-col gap-1 items-center">
                                <div className="w-full max-w-[500px] px-3">

                                    <NoDataIcon className="w-full" />
                                </div>
                                <div className="text-center mt-0 flex flex-col gap-1.5">
                                    <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                                        No tables.
                                    </h3>
                                    <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                                        Owner forgot to create tables or All tables has been deleted.
                                    </p>
                                </div>
                            </div>

                    }
                </> :
                <div className="w-full flex flex-col gap-1 items-center">
                    <div className="w-full max-w-[500px] px-3">

                        <NoDataIcon className="w-full" />
                    </div>
                    <div className="text-center mt-0 flex flex-col gap-1.5">
                        <h3 className="text-[17px] sm:text-[19px] font-semibold text-main-text">
                            No Sitting Zones
                        </h3>
                        <p className="text-[12px] sm:text-[13px] font-medium text-low-text/70 max-w-[300px] leading-snug">
                            Owner Forgot to create sitting zones or all have been removed.
                        </p>
                    </div>
                </div>
            }
        </div>
    )
}