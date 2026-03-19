import { BiRupee, BiDollar, BiEuro, BiYen, BiPound } from "react-icons/bi";


export const currencies = [
    {
        id: 1,
        sign: <BiRupee />,
        name: 'Indian Rupee',
        key: 'INR',
        symbol: '₹'
    },
    {
        id: 2,
        sign: <BiDollar />,
        name: 'US Dollar',
        key: 'USD',
        symbol: '$'
    },
    {
        id: 3,
        sign: <BiEuro />,
        name: 'Euro',
        key: 'EUR',
        symbol: '€'
    },
    {
        id: 4,
        sign: <BiPound />,
        name: 'Pound',
        key: 'GBP',
        symbol: '£'
    },
    {
        id: 5,
        sign: <BiYen />,
        name: 'Japanese Yen',
        key: 'JPY',
        symbol: '¥'
    },
];

export const cuissineTypes = [
    {
        id: 1,
        label: 'Cafe/Coffee Shop',
        value: 'cafe',
    },
    {
        id: 2,
        label: 'Fast Food Restaurant',
        value: 'fast_food',
    },
    {
        id: 3,
        label: 'Fine Dining Restaurant',
        value: 'fine_dining',
    },
    {
        id: 4,
        label: 'Casual Dining Restaurant',
        value: 'casual_dining',
    },
    {
        id: 5,
        label: 'Bakery',
        value: 'bakery',
    },
    {
        id: 6,
        label: 'Bar/Pub',
        value: 'bar',
    },
    {
        id: 7,
        label: 'Pop-up Restaurant',
        value: 'pop_up',
    },
    {
        id: 8,
        label: 'Family Restaurant',
        value: 'family',
    },
    {
        id: 9,
        label: 'Theme Restaurant',
        value: 'theme_based',
    },
    {
        id: 10,
        label: 'Fast Casual',
        value: 'fast_casual',
    },
    {
        id: 11,
        label: 'Buffet Restaurant',
        value: 'buffet',
    },
    {
        id: 12,
        label: 'Pure Veg',
        value: 'veg',
    },
];

export const weekDays = [
    {
        id: 1,
        label: 'Monday',
        key: 'mon',
    },
    {
        id: 2,
        label: 'Tuesday',
        key: 'tue',
    },
    {
        id: 3,
        label: 'Wednesday',
        key: 'wed',
    },
    {
        id: 4,
        label: 'Thursday',
        key: 'thu',
    },
    {
        id: 5,
        label: 'Friday',
        key: 'fri',
    },
    {
        id: 6,
        label: 'Saturday',
        key: 'sat',
    },
    {
        id: 7,
        label: 'Sunday',
        key: 'sun',
    },

];