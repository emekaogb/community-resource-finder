import { useEffect } from "react";

function GetLocation() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log(pos.coords);
        });
    }, []);
}

export default GetLocation;