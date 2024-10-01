export const createPatient = async (data: FormData) => {
    const fetchData = await fetch(`http://localhost:5000/api/v1/user/create-patient`, {
        method: 'POST',
        body: data,
        cache: 'no-store'
    })
    const res = await fetchData.json()
    return res;
}