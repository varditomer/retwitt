export const utilService = {
    makeId,
    timeStampConverter
}
function makeId(length = 5): string {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function timeStampConverter(timestamp: number) {

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]

    const date = new Date(timestamp * 1000)
    const day = date.getDate()
    const month = months[date.getMonth()]
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedHours = hours < 10 ? `0${hours}` : hours
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

    return (`${day} ${month} at ${formattedHours}:${formattedMinutes}`)


}