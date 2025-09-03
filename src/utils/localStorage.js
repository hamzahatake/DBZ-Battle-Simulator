import { useEffect } from "react";
import { useSelector } from "react-redux";

const StorageSync = () => {
    const savedTeams = useSelector((state) => state.teams.savedTeams);

    useEffect(() => {
        localStorage.setItem("savedTeams", JSON.stringify(savedTeams));
    }, [savedTeams]);

    return null;
};

export default StorageSync;
