interface Review {
    id: string;
    doctorId: string;
    patientId: string;
    appointmentId: string;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
}

interface DoctorSpecialty {
    specialtiesId: string;
    doctorId: string;
}

export interface IDoctor {
    id: string;
    email: string;
    name: string;
    profilePhoto: string;
    contactNumber: string;
    address: string;
    registrationNumber: string;
    experience: number;
    gender: "MALE" | "FEMALE";
    apointmentFee: number;
    qualification: string;
    currentWorkingPlace: string;
    designation: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    averageRating: number;
    review: Review[] | [];
    doctorSpecialties: DoctorSpecialty[] | [];
}