import React from 'react';
import { IoClose, IoPrintOutline } from "react-icons/io5";

export default function BillReceiptModal({ billData, restaurantData, currency, onClose }) {
    
    // Print function
    const handlePrint = () => {
        window.print();
    };

    if (!billData) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:bg-white print:p-0">
            
            {/* Receipt Container - Set to approx 80mm width for thermal printers */}
            <div className="bg-white w-full max-w-[320px] rounded-lg shadow-xl overflow-hidden print:w-[80mm] print:shadow-none print:rounded-none">
                
                {/* Header Actions (Hidden during print) */}
                <div className="flex justify-between items-center p-3 bg-gray-100 border-b print:hidden">
                    <h3 className="font-semibold text-gray-700 text-sm">Bill Generated</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full text-gray-500">
                        <IoClose size={20} />
                    </button>
                </div>

                {/* --- ACTUAL RECEIPT START --- */}
                {/* font-mono makes it look like a typewriter/receipt */}
                <div id="printable-receipt" className="p-5 font-mono text-[12px] text-black bg-white">
                    
                    {/* Restaurant Info */}
                    <div className="text-center mb-4 flex flex-col gap-1">
                        <h2 className="font-bold text-[18px]">{restaurantData?.restaurant_name || "BillnChill Restro"}</h2>
                        <p className="text-[11px] uppercase border-b-2 border-dashed border-black pb-2">
                            Cash Memo / Bill
                        </p>
                    </div>

                    {/* Bill Info */}
                    <div className="flex flex-col gap-0.5 mb-3 text-[11px]">
                        <div className="flex justify-between">
                            <span>Invoice No:</span>
                            <span className="font-semibold">{billData.invoice_no}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{new Date(billData.billed_at).toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="border-t-2 border-dashed border-black pt-2 mb-2">
                        <div className="flex justify-between font-bold mb-1">
                            <span className="w-[60%]">Item</span>
                            <span className="w-[15%] text-center">Qty</span>
                            <span className="w-[25%] text-right">Price</span>
                        </div>
                        
                        {/* Map over items sent by backend */}
                        {billData.items?.map((item, index) => (
                            <div key={index} className="flex justify-between mb-1 items-start">
                                <span className="w-[60%] break-words">{item.item_name} {item.variant_name ? `(${item.variant_name})` : ''}</span>
                                <span className="w-[15%] text-center">{item.quantity}</span>
                                <span className="w-[25%] text-right">{parseFloat(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Totals Section */}
                    <div className="border-t-2 border-dashed border-black pt-2 flex flex-col gap-1">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{currency} {billData.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Table Charge:</span>
                            <span>{currency} {billData.table_charges}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{currency} {billData.tax_amount}</span>
                        </div>
                    </div>

                    {/* Grand Total */}
                    <div className="border-t-2 border-black mt-2 pt-2 flex justify-between font-bold text-[15px]">
                        <span>TOTAL:</span>
                        <span>{currency} {billData.grand_total}</span>
                    </div>

                    <div className="text-center mt-6 mb-2 border-t border-dashed border-black pt-2 text-[10px]">
                        <p>Thank you for visiting!</p>
                        <p>Powered by BillnChill</p>
                    </div>
                </div>
                {/* --- ACTUAL RECEIPT END --- */}

                {/* Action Buttons (Hidden during print) */}
                <div className="p-4 bg-gray-50 flex gap-2 print:hidden">
                    <button 
                        onClick={handlePrint}
                        className="flex-1 bg-black text-white py-2.5 rounded-lg flex justify-center items-center gap-2 font-medium hover:bg-gray-800 transition-all">
                        <IoPrintOutline size={18}/> Print
                    </button>
                </div>
            </div>
        </div>
    );
}