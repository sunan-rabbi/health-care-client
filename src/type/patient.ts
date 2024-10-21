export type IPatient = {
    id: string;
    email: string;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    isDeleted: boolean,
    createdAt: string;
    updatedAt: string;
    medicalReport: [],
    prescription: []
}