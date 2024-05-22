export function isEmpty(obj: Record<string, any> = {}): boolean {
    return Object.keys(obj).length === 0;
}

export function isString(value: any): boolean {
    return typeof value === 'string' || value instanceof String;
}

export function isNumber(value: any): boolean {
    return typeof value === 'number' && !isNaN(value);
}

export function isBoolean(value: any): boolean {
    return value === true || value === false;
}

export function isNil(value: any): boolean {
    return typeof value === 'undefined' || value === null;
}

export function isDateString(value: any): boolean {
    if (!isString(value)) return false;

    return /^\d{2}-\d{2}-\d{4}$/.test(value);
}

export function convertDateString(value: string): string {
    return value.substr(6, 4) + value.substr(3, 2) + value.substr(0, 2);
}

export function toLower(value: any): string | any {
    if (isString(value)) {
        return value.toLowerCase();
    }
    return value;
}

export function convertType(value: any): string {
    if (isNumber(value)) {
        return value.toString();
    }

    if (isDateString(value)) {
        return convertDateString(value);
    }

    if (isBoolean(value)) {
        return value ? '1' : '-1';
    }

    return value.toString();
}

export function filterRows(rows: any[], filters: Record<string, any>): any[] {
    if (isEmpty(filters)) return rows;

    return rows.filter((row) => {
        return Object.keys(filters).every((accessor) => {
            const value = row[accessor];
            const searchValue = filters[accessor];

            if (isString(value)) {
                return toLower(value).includes(toLower(searchValue));
            }

            if (isBoolean(value)) {
                return (searchValue === 'true' && value) || (searchValue === 'false' && !value);
            }

            if (isNumber(value)) {
                return value == searchValue;
            }

            return false;
        });
    });
}

export function sortRows(rows: any[], sort: { order: 'asc' | 'desc', orderBy: string }): any[] {
    return rows.sort((a, b) => {
        const { order, orderBy } = sort;

        if (isNil(a[orderBy])) return 1;
        if (isNil(b[orderBy])) return -1;

        const aLocale = convertType(a[orderBy]);
        const bLocale = convertType(b[orderBy]);

        if (order === 'asc') {
            return aLocale.localeCompare(bLocale, 'en', { numeric: isNumber(b[orderBy]) ? true : false });
        } else {
            return bLocale.localeCompare(aLocale, 'en', { numeric: isNumber(a[orderBy]) ? true : false });
        }
    });
}

export function paginateRows(sortedRows: any[], activePage: number, rowsPerPage: number): any[] {
    return [...sortedRows].slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);
}
