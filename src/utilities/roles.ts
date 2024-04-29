import { ASSIGNMENT_DISTRICT, ASSIGNMENT_DIVISION, ASSIGNMENT_GP, ASSIGNMENT_SURVEYOR, ASSIGNMENT_TALUK, ASSIGNMENT_WARD, ASSIGNMENT_ZONE } from "./routePaths";

export enum DISTRICT_ROLES {
    DPM = "DPM",
    WCD = "WCD-DD",
    DHO = "DHO",
    RDPR = "RDPR-DSO",
    DUDC = "DUDC-PD",
    BBMP = "BBMP"
};

export const DISTRICT_ALL_ROLES = [
    DISTRICT_ROLES.DPM,
    DISTRICT_ROLES.WCD,
    DISTRICT_ROLES.RDPR,
    DISTRICT_ROLES.BBMP,
    DISTRICT_ROLES.DHO,
    DISTRICT_ROLES.DUDC
];
export enum TALUK_ROLES {
    CDPO = "CDPO",
    THO = "THO",
    EO = "EO",
    CMC_TMC_TPC = "CMC/TMC/TPC",
    ZON_IC = "Zone InCharge"
};

export const TALUK_ALL_ROLES = [
    TALUK_ROLES.CDPO,
    TALUK_ROLES.CMC_TMC_TPC,
    TALUK_ROLES.EO,
    TALUK_ROLES.ZON_IC,
    TALUK_ROLES.THO
];
export enum PHC_ROLES {
    SuperVisor = "SuperVisor",
    PHCO = "PHCO",
    PDO = "PDO",
    CAO_CO = "CAO/CO",
    DIVISON_IN = "Division InCharge",
};

export const PHC_ALL_ROLES = [
    PHC_ROLES.CAO_CO,
    PHC_ROLES.PDO,
    PHC_ROLES.PHCO,
    PHC_ROLES.SuperVisor,
    PHC_ROLES.DIVISON_IN
];

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


export const roleArrangeMent = (role: string) => {
    console.log("role", role);
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