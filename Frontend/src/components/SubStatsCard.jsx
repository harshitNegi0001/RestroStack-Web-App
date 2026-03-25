


export default function SubStatsCard({ data }) {
    const colorStyleMap = {
        'green': 'border-green-700/30 text-green-700/70 ',
        'gray': 'border-gray-700/30 text-gray-700/70 ',
        'blue': 'border-blue-700/30 text-blue-700/70 ',
        'orange': 'border-orange-700/30 text-orange-700/70 ',
        'red': 'border-red-700/30 text-red-700/70 ',
        'yellow': 'border-yellow-700/30 text-yellow-700/70 ',
        'indigo': 'border-indigo-700/30 text-indigo-700/70 ',
        'sky': 'border-sky-700/30 text-sky-700/70 ',
        'mist': 'border-mist-700/30 text-mist-700/70 ',
        
    }

    return (
        <div key={data.id}
            className={` w-full p-4 rounded-2xl border-1 ${colorStyleMap[data.color]} flex gap-2 justify-between bg-card-bg items-center`}>
            <div className="flex flex-col ">
                <span className="text-[11px] md:text-[12px] text-low-text font-[Rubik] uppercase font-[500]">{data.title}</span>
                <span className="text-2xl font-bold">{data.value}</span>
            </div>
            <div className="bg-low-text/10 text-[15px] p-2 md:p-3 rounded-2xl">
            {data.icon}
            </div>
        </div>
    )
}