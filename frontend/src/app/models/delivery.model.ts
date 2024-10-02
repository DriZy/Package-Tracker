export interface Delivery {
  _id?: string;
  delivery_id: string;
  package_id: string;
  status: 'open' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  pickup_time: Date;
  start_time?: Date;
  end_time?: Date;
  location?: { lat: number; lng: number };
}
