import React, { useMemo } from 'react';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// Helper function to create an array of numbers
const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

const Pagination = ({ activePage, perPage=5, totalItems, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / perPage) || 1;

    // --- SMART PAGINATION LOGIC (Ellipses Calculation) ---
    const paginationRange = useMemo(() => {
        const siblingCount = 1; // Active page ke aage-peeche kitne numbers dikhane hain
        
        // Agar total pages kam hain, toh sab dikha do (eg: 1 2 3 4 5)
        // 1 (first) + 1 (last) + 1 (current) + 2 (siblings) + 2 (ellipses) = 7
        const totalPageNumbers = siblingCount + 5; 

        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        // Left aur Right siblings ki boundaries nikalna
        const leftSiblingIndex = Math.max(activePage - siblingCount, 1);
        const rightSiblingIndex = Math.min(activePage + siblingCount, totalPages);

        // Decide karna ki kis taraf dots (...) dikhane hain
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 1: Right mein dots dikhane hain, Left mein nahi
        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
            return [...leftRange, '...', totalPages];
        }

        // Case 2: Left mein dots dikhane hain, Right mein nahi
        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(totalPages - rightItemCount + 1, totalPages);
            return [firstPageIndex, '...', ...rightRange];
        }

        // Case 3: Dono taraf dots dikhane hain
        if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
        }
    }, [totalItems, perPage, activePage]);

    if (totalItems === 0) return null;

    // --- HANDLERS ---
    const handlePrev = () => {
        if (activePage > 1) onPageChange(activePage - 1);
    };

    const handleNext = () => {
        if (activePage < totalPages) onPageChange(activePage + 1);
    };

    const startItem = Math.min((activePage - 1) * perPage + 1, totalItems);
    const endItem = Math.min(activePage * perPage, totalItems);

    return (
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2">
            
            {/* Left Side: Showing x to y of z entries */}
            <div className="text-[13px] text-low-text/80 font-medium">
                Showing <span className="font-semibold text-main-text">{startItem}</span> to <span className="font-semibold text-main-text">{endItem}</span> of <span className="font-semibold text-main-text">{totalItems}</span> entries
            </div>

            {/* Right Side: The Smart Pagination Controls */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
                
                {/* Back Button */}
                <button
                    onClick={handlePrev}
                    disabled={activePage === 1}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-lg border-1 border-divider/60 bg-toast-bg hover:bg-divider/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sec-text"
                >
                    <IoChevronBack size={14} /> Back
                </button>

                {/* Page Numbers & Ellipses */}
                {paginationRange.map((pageNumber, index) => {
                    // Agar array item '...' hai toh sirf text dikhao
                    if (pageNumber === '...') {
                        return (
                            <span key={`dots-${index}`} className="px-2 py-1 text-low-text/70 select-none">
                                ...
                            </span>
                        );
                    }

                    // Agar normal number hai toh button dikhao
                    return (
                        <button
                            key={index}
                            onClick={() => onPageChange(pageNumber)}
                            className={`min-w-[32px] h-[32px] flex items-center justify-center text-[13px] font-[600] rounded-lg transition-all
                                ${activePage === pageNumber 
                                    ? 'bg-active-border text-white shadow-md scale-105' // Active State (Black Background jaisa image me hai)
                                    : 'bg-toast-bg border-1 border-divider/60 text-sec-text hover:bg-divider/10' // Inactive State
                                }
                            `}
                        >
                            {pageNumber}
                        </button>
                    );
                })}

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    disabled={activePage === totalPages}
                    className="flex items-center justify-center gap-1 px-3 py-1.5 text-[13px] font-medium rounded-lg border-1 border-divider/60 bg-toast-bg hover:bg-divider/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sec-text"
                >
                    Next <IoChevronForward size={14} />
                </button>
                
            </div>
        </div>
    );
};

export default Pagination;