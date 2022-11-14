const getDate = () => {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = now.toLocaleString("en-US", { month: "long" });
    const today = (day) + " " + (month) + " " + now.getFullYear() ;
    return today
}

export default getDate
