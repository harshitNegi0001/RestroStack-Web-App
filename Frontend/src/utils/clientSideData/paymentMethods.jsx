import { ImCreditCard } from "react-icons/im";
import { BsCashStack } from "react-icons/bs";
import { MdQrCodeScanner } from "react-icons/md";




export const payMethodOptions = [
    {
        id: 1,
        label: 'Cash',
        icon: <BsCashStack />,
        value: 'cash'
    },
    {
        id: 2,
        label: 'UPI/QR Code',
        icon: <MdQrCodeScanner />,
        value: 'upi'
    },
    {
        id: 3,
        label: 'Card',
        icon: <ImCreditCard />,
        value: 'card'
    }
]