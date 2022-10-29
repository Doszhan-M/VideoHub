import axios from "axios"


 const fetchAllTasks = async () => {
    const result = await axios.get(`/distributor/all_tasks_statuses`).then(response => {
        return response
    })
    return result
}

 const fetchExtendedTaskResult = async (iin_bin) => {
    const result = await axios.get(`/distributor/extended_task_result?iin_bin=${iin_bin}`).then(response => {
        return response
    })
    return result
}

export default {fetchAllTasks, fetchExtendedTaskResult}
