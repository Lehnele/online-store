import {makeAutoObservable} from "mobx";

export interface ICategory {
    id: number,
    name: string
}

export interface IBrand extends ICategory {};

export interface IInfo {
    id: number,
    title: string,
    description: string
}

export interface IDevice extends ICategory {
    id: number;
    price: number,
    rating: number,
    img: string,
    info: IInfo[]
}

export default class DeviceStore {
    private _categories: ICategory[];
    private _brands: IBrand[];
    private _devices: IDevice[];
    private _selectedCategory: ICategory;
    private _selectedBrand: IBrand;
    private _page: number;
    private _totalCount: number;
    private _limit: number;

    constructor() {
        this._categories = [] as ICategory[];
        this._brands = [] as IBrand[];
        this._devices = [] as IDevice[];
        this._selectedCategory = {} as ICategory;
        this._selectedBrand = {} as IBrand;
        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;
        makeAutoObservable(this)
    }

    setCategories(categories: ICategory[]): void {
        this._categories = categories;
    }

    setBrands(brands: IBrand[]): void {
        this._brands = brands;
    }

    setDevices(devices: IDevice[]): void {
        this._devices = devices;
    }

    setSelectedCategory(category: ICategory): void {
        this.setPage(1);
        this._selectedCategory = category;
    }

    setSelectedBrand(brand: IBrand): void {
        this.setPage(1);
        this._selectedBrand = brand;
    }

    setPage(page: number): void {
        this._page = page;
    }

    setTotalCount(totalCount: number): void {
        this._totalCount = totalCount;
    }

    setLimit(limit: number): void {
        this._limit = limit;
    }

    get categories(): ICategory[] {
        return this._categories;
    }

    get brands(): IBrand[] {
        return this._brands;
    }

    get devices(): IDevice[] {
        return this._devices;
    }

    get selectedCategory(): ICategory {
        return this._selectedCategory;
    }

    get selectedBrand(): IBrand {
        return this._selectedBrand;
    }

    get page(): number {
        return this._page;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    get limit(): number {
        return this._limit;
    }
}
