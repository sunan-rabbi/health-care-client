export interface IDoctorSchedule {
    doctorId: string
    scheduleId: string
    isBooked: boolean
    createdAt: string
    updatedAt: string
    appointmentId: any
    doctor: IDoctor
    schedule: ISchedule
}

interface IDoctor {
    id: string
    email: string
    name: string
    profilePhoto: string
    contactNumber: string
    address: string
    registrationNumber: string
    experience: number
    gender: string
    apointmentFee: number
    qualification: string
    currentWorkingPlace: string
    designation: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    averageRating: number
}

export interface ISchedule {
    id: string
    startDate: string
    endDate: string
    createdAt: string
    updatedAt: string
}
