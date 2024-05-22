import { ASSIGNMENT_DISTRICT, ASSIGNMENT_DIVISION, ASSIGNMENT_GP, ASSIGNMENT_SURVEYOR, ASSIGNMENT_TALUK, ASSIGNMENT_WARD, ASSIGNMENT_ZONE } from "./routePaths";

export enum ROLES {
    SUPER_ADMIN = 'Super Admin',
    DISTRICT_OFFICER = 'District Officer',
    TALUK_OFFICER = 'Taluk Officer',
    PHCO_OFFICER = 'Phco Officer',
    ZONE_OFFICER = 'Zone Officer',
    DIVISION_OFFICER = 'Division Officer',
    Ward_OFFICER = 'Ward Officer',
    BBMP_HEAD = 'BBMP Head',
    GP_OFFICER = 'GramaPanchayat Officer',
};

export enum ASSIGNMENT {
    DISTRICT = 'District',
    TALUK = 'Taluk',
    Zone = 'Zone',
    Ward = 'Ward',
    Division = 'Division',
    GP = 'GramaPanchayat',
    GET_GP = 'Gp',
    VILLAGE = 'Village',
};

export enum H {
    A= "ASDc",
    B="adf"
}

export const roleArrangeMent = (role: string) => {

    switch (role) {
        case ROLES.SUPER_ADMIN:
            return {
                username: "SA",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_DISTRICT }]
            };
            // for rural roles
        case ROLES.DISTRICT_OFFICER:

            return {
                username: "DI",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_TALUK }]
            };
        case ROLES.TALUK_OFFICER:
            return {
                username: "TA",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_GP }]
            };
        case ROLES.GP_OFFICER:
            return {
                username: "GP",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_SURVEYOR }]
            };
            // for urban roles
        case ROLES.DIVISION_OFFICER:
            return {
                username: "WA",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_WARD }]
            };
        case ROLES.ZONE_OFFICER:
            return {
                username: "WA",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_DIVISION }]
            };
        case ROLES.BBMP_HEAD:
            return {
                username: "BH",
                dropDown: [{ routeName: "Assignment", routePath: ASSIGNMENT_ZONE }]
            };
        default:
            return {
                username: "U",
                dropDown: [{ routeName: "Assignment", routePath: `/` }]
            };
    }
};

export const rolesMapping = (role: string) => {
    switch (role) {
        case ROLES.DISTRICT_OFFICER:
            return ROLES.TALUK_OFFICER;
        case ROLES.BBMP_HEAD:
            return ROLES.ZONE_OFFICER;
        case ROLES.ZONE_OFFICER:
            return ROLES.DIVISION_OFFICER;
        case ROLES.TALUK_OFFICER:
            return ROLES.GP_OFFICER;
        default:
            return ""
        }
}