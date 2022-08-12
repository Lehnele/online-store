import {$host, $authHost} from "./index";

export const createCategory = async (category: {name: string}) => {
    const {data} = await $authHost.post('api/type', category);
    return data;
}

export const removeCategory = async (id: number) => {
    const {data} = await $host.delete('api/type', {data:{id}});
    return data;
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/type');
    return data;
}

export const createBrand = async (brand: {name: string}) => {
    const {data} = await $authHost.post('api/brand', brand);
    return data;
}

export const removeBrand = async (id: number) => {
    const {data} = await $host.delete('api/brand', {data:{id}});
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}

export const createDevice = async (device: FormData) => {
    const {data} = await $authHost.post('api/device', device);
    return data;
}

export const removeDevice = async (id: number) => {
    const {data} = await $host.delete('api/device', {data:{id}});
    return data;
}

export const fetchDevices = async (typeId: number | null, brandId: number | null, page: number, limit: number = 5) => {
    const {data} = await $host.get('api/device', {params: {
            typeId, brandId, page, limit
        }});
    return data;
}

export const fetchOneDevice = async (id: string) => {
    const {data} = await $host.get('api/device/' + id);
    return data;
}

export const fetchAllDevices = async () => {
    const {data} = await $host.get('api/device');
    return data;
}
