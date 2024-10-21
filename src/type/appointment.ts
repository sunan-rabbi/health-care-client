import { IDoctor } from "./doctor"
import { IPatient } from "./patient";
import { ISchedules } from "./schedules"

export type IAppointment = {
    id: string;
    patientId: string;
    doctorId: string;
    scheduleId: string;
    videoCallingId: string;
    status: string;
    paymentStatus: string;
    notes: null,
    createdAt: string;
    updatedAt: string;
    doctor: IDoctor,
    schedule: ISchedules,
    patient: IPatient
}