export interface Delivery {
  _id?: string;
  package_id: string;
  status: string;
  location: { lat: number, lng: number };
}
