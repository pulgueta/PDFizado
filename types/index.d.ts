export type Layout = {
    children: React.ReactNode;
};

export type NavbarRoutes = {
    href: string;
    label: string;
    active?: boolean;
};

export type Env = {
    [key: string]: string;
};
