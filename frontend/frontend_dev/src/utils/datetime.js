const calcDuration = (start_time, finish_time) => {
    const strToDate = (strTime) => {
        const [timeValues, dateValues] = strTime.split(' ');
        const [month, day, year] = dateValues.split('/');
        const [hours, minutes, seconds] = timeValues.split(':');
        return new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
    }
    if (finish_time != null) {
        const start = strToDate(start_time)
        const finish = strToDate(finish_time)
        const duration = (finish - start) / 1000
        var date = new Date(duration * 1000);
        var strDuration = date.toTimeString().split(' ')[0].slice(3);
        return strDuration
    }
}

export default calcDuration
