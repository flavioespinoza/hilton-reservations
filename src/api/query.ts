const _QueryHotelList = () => {
    return [
        {
            label: 'Hilton NYC',
            value: 'Hilton NYC'
        },
        {
            label: 'Hilton Brooklyn New York',
            value: 'Hilton Brooklyn New York'
        },
        {
            label: 'Hilton LAX',
            value: 'Hilton LAX'
        },
        {
            label: 'Hilton Miami Downtown',
            value: 'Hilton Miami Downtown'
        },
        {
            label: 'Hilton Paris Opera',
            value: 'Hilton Paris Opera'
        },
        {
            label: 'Bikini Bottom Hilton',
            value: 'Bikini Bottom Hilton'
        }
    ]
}

const _QueryReservations = () => {
    return `
        {
            reservations {
                name
                hotelName
                arrivalDate
                departureDate
                id
            }
        }
    `
}

export { _QueryHotelList, _QueryReservations }
