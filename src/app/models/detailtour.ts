export class Detailtour {
    id : any;
    name: string;
    display_price: any;
    actual_price: number;
    facility: any[];
    description: any[];
    activity: string;
    information_activity : {
        inclusive: any[];
        exclusive: any[];
        confirmation: any[];
        trip_plan: any[];
        add_information: any[];
        tips: any[];
    }
    how_to_use : {
        use_ticket: any[];
        opening_hours: any[];
        location: any[];
    }
    canceled_policy : any[];
    latitude: any;
    longitude: any;
    stock: any;
    percent_discount: any;
    images: any[];
    atm: {
        realprice: any;
        userprice: any;
    }
    creditcard: {
        realprice: any;
        userprice: any;
    }
    minimarket: {
        realprice: any;
        userprice: any;
    }
    trip_date: any;
}