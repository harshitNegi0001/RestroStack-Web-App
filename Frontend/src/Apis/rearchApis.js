import axios from "axios";
import toast from "react-hot-toast";

export const searchLocation = async (query) => {
    try {
        const result = await axios.get(
            `https://photon.komoot.io/api/?q=${query}`
        );

        const data = result.data.features;
        return data;
    } catch (err) {
        console.log(err);
        toast.error('Something Went Wrong!');
        return [];
    }
}