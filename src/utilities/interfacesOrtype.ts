import React, { ChangeEvent, SetStateAction } from "react";
import { Dispatch } from "redux";

export interface ISelectInput {
    options?: any;
    value?:string; 
    defaultSelect?:string; 
    isRoleSelect?:boolean; 
    controlId?:string; 
    name?:string;
    isValueAdded?: boolean, 
    required?: boolean, 
    onChange?: (e: any) => void;
}

export interface ITitleBar {
    title?: string;
    Component?: JSX.Element
}

export interface AvatarDropdownProps {
    username?: string;
    avatarUrl?: string;
    dropDown: IAvatarDropDownArray[]
  };

  export interface IAvatarDropDownArray {
    routeName?: string; 
    routePath?: string;
  }
export interface ITextInput {
    onChange?: (e: any) => void;
    name?: string;
    placeholder?: string;
    value?:string; 
    defaultOption?:string; 
    controlId?:string; 
    type?:string; 
    maxLength?:number; 
    disabled?:boolean; 
    className?:any; 
}
export interface IMasterData {
    DistrictCode?: string;
    DistrictName?: string;
    Type?: string;
    TalukName?:string; 
    TalukCode?:string; 
    GramPanchayatCode?:string; 
    GramPanchayatName?:string; 
    Name?:string; 
    Role?:string; 
    Mobile?:string;
    PHCCode?:string;
    CreatedRole?: string;
    CreatedMobile?: string; 
    SurveyedName?: string; 
    SurveyedMobile?: string; 
    SurveyedRole?: string; 
    VillageName?: string; 
    VillageCode?: string; 
}
export interface ITableColumns {
    label : string,
    sorting: boolean,
    key: string,
}
export interface IReportsMasterData {
    DistrictCode?: string;
    DistrictName?: string;
    TalukName?:string; 
    TalukCode?:string; 
    GramPanchayatCode?:string; 
    GramPanchayatName?:string; 
    VillageName?: string; 
    VillageCode?: string; 
    UnAssigned?: string; 
    Completed?: string; 
    Scheduled?: string; 
    TotalCount?: string; 
}
export interface IModalFromEdit {
    title?: string;
    onHide?: () => void;
    show?: boolean;
    saveType?: string;
    handleSubmitForm?: any;
    formData?: any;
    isType?: string;
    handleInputChange?: (e: any) => void;
    handleModifyAssignedUser?: any;
    isRoleSelectOption?: boolean;
}
export interface IAssignMentModal {
    title?: string;
    onHide?: () => void;
    show?: boolean;
    saveType?: string;
    handleSubmitForm?: any;
    formData?: any;
    handleInputChange?: (e: any) => void;
    handleModifyAssignedUser?: any;
}
export interface ILoaderOverlay {
    isLoading?: boolean;
}
export interface ISearchBox {
    searchTerm?: string;
    setSearchTerm?: any;
}
export interface IPagination {
    totalPages?: number | any;
    currentCount?: number | any;
    currentPage?: number | any;
    onPageChange?: any;
    totalCount?: string | any;
    itemsPerPage?: string | any;
};

export interface ItableWithPagination {
    totalPages?: number | any;
    currentCount?: number | any;
    currentPage?: number | any;
    onPageChange?: any;
    totalCount?: string | any;
    onClick?: any;
    title?: string;
    headers?: String[];
    tableBody?: any;
    searchTerm?: string;
    itemsPerPage?: number;
    setSearchTerm?: Function;
    setItemsPerPage?: Function;
    filteredData?: IMasterData[] | any;
    columns?: ITableColumns[];
    handleCLickModify?: any
  }

  export interface ITableRowsPerPageDropDown {
    itemsPerPage?: number;
    setItemsPerPage?: any
  }
export interface IDashBoardCounts {
    Totalcount?: number | undefined;
    TotalOffline?: number | undefined;
    TotalMobile?: number | any;
    TotalOnline?: number;
}
export interface IReportsDashBoard {
    Gl_Count?: number | undefined;
    Gj_Count?: number | undefined;
    Yn_Count?: number | undefined;
    Ab_Count?: number | undefined;
    Ss_Count?: number | undefined;
}
export interface IDistrictReports {
    DistrictName?: string;
    TalukOrTownName?: string;
    Gruhalakshmi?: string;
    GruhaJyothi?: string;
    Yuvanidhi?: string;
    AnnaBhagya?: string;
    Shakthi?: string;
    Asha?: string;
    Anganvadi?: string;
    UrbanSurveyor?: string | undefined;
    Total_Asha_AWW?: string;
}

export interface ISelectItemsListProps {
    district?: string;
    type?: string;
    taluk?: string;
    panchayat?: string;
    village?: string;
}
