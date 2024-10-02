export enum DeliveryStatus {
    Open = 'open',
    PickedUp = 'picked-up',
    InTransit = 'in-transit',
    Delivered = 'delivered',
    Failed = 'failed'
}

export enum PackageStatus {
    Created = 'created',
    InTransit = 'in-transit',
    Delivered = 'delivered'
}
export enum UserRoles {
    Customer = 'customer',
    Driver = 'driver',
    Admin = 'admin'
}