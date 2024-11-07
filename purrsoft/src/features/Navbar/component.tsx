import { useState } from 'react';
import { useAccountQuery } from '../../store';
import { useTheme } from '@emotion/react';

type RouteLabel = 'Home' | 'Program' | 'Animalute' | 'Evenimente';

type RouteObject = {
  label: RouteLabel;
  value: string;
  url: string;
};

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAccountQuery();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>(location.pathname);

  const {
    visibility: drawerOpen,
    onOpen: onOpenDrawer,
    onClose: onCloseDrawer,
  } = useVisibility();

  const routes: RouteObject[] = [
    {
      label: 'Home',
      value: '/',
      url: '/',
    },
    {
      label: 'Program',
      value: '/Program',
      url: '/Program',
    },
    {
      label: 'Animalute',
      value: '/Animalute',
      url: '/Animalute',
    },
    {
      label: 'Evenimente',
      value: '/Evenimente',
      url: '/Evenimente',
    },
  ];

  const theme = useTheme();

  const open = Boolean();
};
