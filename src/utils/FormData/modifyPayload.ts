export const modifyPayload = (data: any) => {
    const value = { ...data }
    const file = value['file']
    delete value['file']
    const obj = JSON.stringify(value)
    const formData = new FormData();
    formData.append("data", obj)
    formData.append('file', file as Blob)
    return formData
}