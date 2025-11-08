export interface Booking {
    id_booking: number;

    stayId: number;

    backpackerId: number;

    short_description: string;

    request_date_start: Date;

    request_date_end: Date;

    status: 'pending' | 'accepted' | 'rejected' | 'cancelled';

    email: string;

    number: string;

}