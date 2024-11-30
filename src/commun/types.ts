export interface PageResponse<T> {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    items: T[];
}

export interface Sort<T> {
    field: keyof T;
    order: 'asc' | 'desc';
}