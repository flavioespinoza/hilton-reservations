import React from 'react'
import ReservationsList from './ReservationsList'
import { _QueryReservations } from '../../api/api'
import gql from 'graphql-tag'
import { MockedProvider } from 'react-apollo/test-utils'
import renderer from 'react-test-renderer'


const query_reservations = _QueryReservations()
const RESERVATIONS_QUERY = gql`${query_reservations}`

const mocks = [
    {
        request: {
            query: RESERVATIONS_QUERY
        },
        result: {
            data: {
                reservations: [
                    {
                        name: 'Gokul',
                        arrivalDate: '1/12/19',
                        hotelName: 'Hilton LAX',
                        id: 'cjru8ah2z446w0a44z3owpy5q',
                        departureDate: '1/24/19'
                    },
                    {
                        name: 'Dave',
                        arrivalDate: '1/15/19',
                        hotelName: 'Hilton LAX',
                        id: 'cjru9qnoz475s0a44fmif7jw4',
                        departureDate: '1/24/19'
                    },
                    {
                        name: 'David',
                        arrivalDate: '1/12/19',
                        hotelName: 'Marriott',
                        id: 'cjruain5l79zz0a59368z90vz',
                        departureDate: '1/24/19'
                    },
                    {
                        name: 'test',
                        arrivalDate: '2019-11-22',
                        hotelName: 'Test',
                        id: 'cjs3jngnq8og90b26xi9dwsvn',
                        departureDate: '2019-11-22'
                    }
                ]
            }
        }
    }
]


describe('ReservationsList', () => {
    it('renders without error', () => {
        renderer.create(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ReservationsList />
            </MockedProvider>
        )
    })
})