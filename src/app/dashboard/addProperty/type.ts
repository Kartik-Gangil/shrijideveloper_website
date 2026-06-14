export interface PropertyForm {
    title: string;
    price: string;
    area: string;
    locationDescription: string;
    address: string;
    amenities: {
        roadaccess: boolean;
        electricity: boolean;
        watersupply: boolean;
        reraapproved: boolean;
    };
    existingImages: string[];
    images: File[];
}
