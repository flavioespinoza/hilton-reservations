function _reservations() {
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

function _createReservation(name: string, hotel: string, arrivalDate: string, departureDate: string) {
    return `
        mutation {
            createReservation(
                data: {
                    name: "${name}"
                    hotelName: "${hotel}"
                    arrivalDate: "${arrivalDate}"
                    departureDate: "${departureDate}"
                }
            ) 
            {
                id
                name
                hotelName
                arrivalDate
                departureDate
            }
        }
    `
}

export { 
    _createReservation,
    _reservations
}
