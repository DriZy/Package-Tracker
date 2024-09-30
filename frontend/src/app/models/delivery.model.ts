export interface Delivery {
  delivery_id: string;
  package_id: string;
  status: 'open' | 'picked-up' | 'in-transit' | 'delivered' | 'failed';
  pickup_time?: Date;
  start_time?: Date;
  end_time?: Date;
  from_location: { lat: number; lng: number };
  to_location: { lat: number; lng: number };
}
