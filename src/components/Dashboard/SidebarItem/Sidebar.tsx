import { DrawerItem } from "@/type";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";


const SidebarListItem = ({ item }: { item: DrawerItem }) => {
    const path = item.path.toLocaleLowerCase()
    const linkPath = `/dashboard/${path}`
    const pathName = usePathname()
    return (
        <Link href={linkPath}>
            <ListItem
                disablePadding
                sx={{
                    ...(pathName === linkPath
                        ? {
                            borderRight: '3px solid #1586FD',
                            "& svg": {
                                color: '#1586FD'
                            }
                        } : {}
                    ),
                    mb: 1
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        {item.icon && <item.icon />}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
};

export default SidebarListItem;