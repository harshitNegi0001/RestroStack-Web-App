
const subscriptions_plans = {
    "demo": {
        price: 0,
        type: 'Experience Plan(Demo)',
        tagline: 'Test the full power of RestroStack for your new outlet.',
        key_features: [
            'full access to all pro features.',
            'Setup your first Digital Menu.',
            'Test billing & KDS integration.',
        ],
        note: 'This plan is exclusive to new users and cannot be renewed or repurchased.'
    },
    "growth": {
        price: 499,
        type: 'Pro Plan(Growth)',
        tagline: "Professional tools to scale your restaurant's efficiency.",
        key_features: [
            'Unlimited Billing & Invoice.',
            'Advanced inventory tracking.',
            'Staff performance Analytics.',
            'Manage upto 25 tables.',
            'Priority chat support.'
        ],
        note: 'This plan is exclusive to new users and cannot be renewed or repurchased.'
    },
    "enterprice":{
        price: 799,
        type: 'Master Plan(Enterprice)',
        tagline: "The ultimate control center for multi-outlet chains.",
        key_features: [
            'Multi-location Management.',
            'Third-party Delivery Integreations.',
            'Customer Branding & White-labeling.',
            'Unlimited Staff Accounts.',
            'Dedicated 24/7 Account Manager.'
        ],
        note: 'This plan is exclusive to new users and cannot be renewed or repurchased.'
    },
}


export default function SubscriptionWindow() {

    return (
        <div
            className="w-[100vw] min-h-[100dvh] flex flex-col justify-center items-center p-2">
            <div className="w-full flex flex-col pt-5 items-center justify-center md:flex-row gap-3 md:gap-1">
                <div className="border-1 relative md:border-2 border-active-border/40 rounded-2xl
                w-full max-w-[450px] md:w-[30%] p-3 md:p-5 flex flex-col h-[450px] md:h-[500px] lg:h-[450px] justify-center items-center gap-4 bg-card-bg">
                    {/* card1 */}
                    <div className="py-2 px-4 rounded-2xl absolute top-[-15px] text-sec-text bg-active-border text-[14px] md:text-[15px]">
                        Current Active Plan
                    </div>
                    <div className="flex flex-col gap-1 items-center">
                        <h6 className="font-[600] text-main-text text-[16px] md:text-[18px] text-center">{subscriptions_plans.demo.type}</h6>
                        <div className="flex gap-1 items-center w-full justify-center">
                            <span className="text-main-text text-[50px] md:text-[54px] font-[500]">
                                ₹{subscriptions_plans.demo.price}
                            </span>
                            <div className="flex flex-col text-low-text/70 text-[9px]/3 md:text-[11px]/3">
                                <span>
                                    /month
                                </span>

                                <span>
                                    Valid for first
                                </span>
                                <span>30 days only</span>
                            </div>

                        </div>
                        <p className="text-center text-sec-text/80 text-[9px]/3 md:text-[11px]/3">{subscriptions_plans.demo.tagline}</p>
                    </div>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <ul className="flex w-[80%] list-disc flex-col text-start gap-1 text-sec-text text-[12px] md:text-[13px]">
                        {/* features */}
                        {
                            subscriptions_plans.demo.key_features.map((f, i) =>
                                <li key={i}>
                                    {f}
                                </li>
                            )
                        }
                    </ul>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <button
                        className={` mt-3 px-4 py-2  rounded-lg  border-1 flex items-center text-center justify-center
                            border-low-text/80 hover:border-low-text hover:bg-low-text/10 active:border-sec-text active:bg-low-text/30
                            text-low-text/80 hover:text-low-text active:text-sec-text
                             text-[12px] md:text-[13px] lg:text-[14px] font-[600]`}>
                        Cancel
                    </button>
                </div>
                <div className="border-1 md:border-2 border-active-border/40 rounded-2xl
                w-full max-w-[450px] md:w-[30%] md:scale-115 p-3 md:p-5 flex flex-col h-[450px] md:h-[500px] lg:h-[450px]  justify-center  items-center gap-4 bg-success-bg">
                    {/* card2 */}
                    <div className="flex flex-col gap-1 items-center">
                        <h6 className="font-[600] text-main-text text-[16px] md:text-[18px] text-center">{subscriptions_plans.growth.type}</h6>
                        <div className="flex gap-1 items-center w-full justify-center">
                            <span className="text-main-text text-[50px] md:text-[54px] font-[500]">
                                ₹{subscriptions_plans.growth.price}
                            </span>
                            <div className="flex flex-col text-low-text/70 text-[9px]/3 md:text-[11px]/3">
                                <span>
                                    /month
                                </span>

                                <span>
                                    
                                </span>
                                <span></span>
                            </div>

                        </div>
                        <p className="text-center text-sec-text/80 text-[9px]/3 md:text-[11px]/3">{subscriptions_plans.growth.tagline}</p>
                    </div>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <ul className="flex w-[80%] list-disc flex-col text-start gap-1 text-sec-text text-[12px] md:text-[13px]">
                        {/* features */}
                        {
                            subscriptions_plans.growth.key_features.map((f, i) =>
                                <li key={i}>
                                    {f}
                                </li>
                            )
                        }
                    </ul>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <button
                        className={` mt-3 py-2 px-4 rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center text-center justify-center
                         text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99`}>
                        Upgrade
                    </button>
                </div>
                <div className="border-1 md:border-2 border-active-border/40 rounded-2xl
                w-full max-w-[450px] md:w-[30%] p-3 md:p-5 flex flex-col items-center h-[450px] md:h-[500px] lg:h-[450px] justify-center  gap-4 bg-card-bg">
                    {/* card3 */}
                    <div className="flex flex-col gap-1 items-center">
                        <h6 className="font-[600] text-main-text text-[16px] md:text-[18px] text-center">{subscriptions_plans.enterprice.type}</h6>
                        <div className="flex gap-1 items-center w-full justify-center">
                            <span className="text-main-text text-[50px] md:text-[54px] font-[500]">
                                ₹{subscriptions_plans.enterprice.price}
                            </span>
                            <div className="flex flex-col text-low-text/70 text-[9px]/3 md:text-[11px]/3">
                                <span>
                                    /month
                                </span>

                                <span>
                                </span>
                                <span></span>
                            </div>

                        </div>
                        <p className="text-center text-sec-text/80 text-[9px]/3 md:text-[11px]/3">{subscriptions_plans.enterprice.tagline}</p>
                    </div>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <ul className="flex w-[80%] list-disc flex-col text-start gap-1 text-sec-text text-[12px] md:text-[13px]">
                        {/* features */}
                        {
                            subscriptions_plans.enterprice.key_features.map((f, i) =>
                                <li key={i}>
                                    {f}
                                </li>
                            )
                        }
                    </ul>
                    <div className="border-dashed w-[90%] border-b-1 md:border-b-2 border-divider"></div>
                    <button
                        className={` mt-3 py-2 px-4 rounded-lg bg-linear-0  text-[12px] md:text-[13px] lg:text-[14px] font-[600] flex items-center text-center justify-center
                         text-white to-green-500  hover:from-green-700 active:to-green-600 active:from-green-800 from-green-600 shadow shadow-md shadow-black/20 hover:shadow-lg active:shadow-sm active:scale-99`}>
                        Upgrade
                    </button>
                </div>

                {/* <div className="border-1 md:border-2 border-active-border/40 rounded-2xl
                w-full md:w-[30%] p-2">
                    
                </div>
                <div className="border-1 md:border-2 border-active-border/40 rounded-2xl
                w-full md:w-[30%] p-2">
                    
                </div> */}
            </div>
        </div>
    )
}