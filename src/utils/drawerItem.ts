import { user_role } from "@/constant/role";
import { DrawerItem, UserRole } from "@/type"

//icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import TryIcon from '@mui/icons-material/Try';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MedicationIcon from '@mui/icons-material/Medication';
import PaymentIcon from '@mui/icons-material/Payment';

export const drawerItems = (role: UserRole) => {
    const roleMenu: DrawerItem[] = [];

    switch (role) {
        case user_role.SUPER_ADMIN:
            roleMenu.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon
                },
                {
                    title: "Manage Users",
                    path: `${role}/manage-users`,
                    icon: GroupIcon
                }
            );
            break;
        case user_role.ADMIN:
            roleMenu.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon
                },
                {
                    title: "Specialties",
                    path: `${role}/specialties`,
                    icon: TryIcon
                },
                {
                    title: "Doctors",
                    path: `${role}/doctors`,
                    icon: MedicalInformationIcon
                },
                {
                    title: "Schedule",
                    path: `${role}/schedules`,
                    icon: CalendarMonthIcon
                },
                {
                    title: "Appointments",
                    path: `${role}/appointments`,
                    icon: EventIcon
                },
                {
                    title: "Reviews",
                    path: `${role}/reviews`,
                    icon: ReviewsIcon
                }
            );
            break;
        case user_role.DOCTOR:
            roleMenu.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: DashboardIcon
                },
                {
                    title: "Schedule",
                    path: `${role}/schedule`,
                    icon: CalendarMonthIcon
                },
                {
                    title: "Appointments",
                    path: `${role}/appointments`,
                    icon: EventIcon
                }
            );
            break;
        case user_role.PATIENT:
            roleMenu.push(
                {
                    title: "Appointments",
                    path: `${role}/appointments`,
                    icon: EventIcon
                },
                {
                    title: "Prescriptions",
                    path: `${role}/prescriptions`,
                    icon: MedicationIcon
                },
                {
                    title: "Payment History",
                    path: `${role}/payment-history`,
                    icon: PaymentIcon
                },

            );
            break;
        default:
            break;
    }
    return [...roleMenu]
}