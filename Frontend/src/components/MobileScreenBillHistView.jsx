import React, { useMemo } from 'react'
import { currencies } from '../utils/clientSideData/setupVariables';
import { useSelector } from 'react-redux';

const MobileScreenBillHistView = ({ isLoading = false, type = 'default', tableData = [] }) => {

  const { activeResData } = useSelector(state => state.auth);
  const currency = useMemo(() => currencies.find(c => c.key == activeResData?.currency)?.symbol || '₹', [activeResData?.currency]);
  const mobileViewCol = {
    'default': {
      headerKey: 'Invoice No',
      headerValue: 'invoice_no',
      fullDataKey: [ 'Table','Zone', 'Payment Method', 'Payment Status','Staff Name', `Revenue (${currency})`],
      fullDataValue: [ 'table_name','zone_name', 'payment_method', 'payment_status','created_by', 'grand_total']
    }
  }

  return (
    <div className='w-full flex sm:hidden flex-col gap-2 py-2 px-3'>
      {tableData?.map(d => <div key={d.id} className='w-full rounded-2xl bg-card-bg border-1 border-divider/60 overflow-hidden shadow-black/30 shadow-md'>
        <div className='w-full bg-active-border/70 py-2 gap-1 flex flex-row justify-between text-[12px] px-2 border-b-1 border-divider/60'>
          <span className='text-white/70 font-[500]'>
            {mobileViewCol[type]?.headerKey}
          </span>
          <span className='flex-1 text-end truncate min-w-0 text-white font-[600]'>
            {
              d[mobileViewCol[type]?.headerValue]
            }
          </span>
        </div>
        <div className='p-2 flex flex-col gap-0.5 text-[12px] capitalize text-sec-text/80'>
          {mobileViewCol?.[type]?.fullDataKey.map((t, i) =>
            <div key={i} className='w-full flex items-center justify-between'>
              <span >{t} :</span>
              <span className='flex-1 min-w-0 truncate text-end font-[600]'>{d[mobileViewCol?.[type]?.fullDataValue[i]]}</span>
            </div>
          )}
        </div>
      </div>)}
    </div>
  )
}

export default MobileScreenBillHistView
