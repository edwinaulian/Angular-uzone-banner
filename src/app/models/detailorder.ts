export class Detailorder {
    id : number;
    name: string;
    display_price: number;
    actual_price: number;
    facility: string;
    description: string;
    activity: string;
    information_activity : {
        inclusive: string;
        exclusive: string;
        confirmation: string;
        trip_plan: string;
        add_information: string;
        tips: string;
    }
    how_to_use : {
        use_ticket: string;
        opening_hours: number;
        location: string;
    }
    canceled_policy : string;
    stock: number;
}