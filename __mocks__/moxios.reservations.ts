import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'
import { createReservation, reservations } from './mocks.data'
import { equal } from 'assert'

describe('mock createReservation request', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('returns createResrvation', done => {
        let _CreateReservation = createReservation
    
        moxios.wait(() => {
            let request = moxios.request.mostRecent()
    
            request
                .respondWith({
                    status: 200,
                    response: _CreateReservation()
                })
                .then((res: any) => {
                    equal(res, 'create_reservation', 'success')
                    done()
                })
        })
    })
    
})

describe('mock reservations request', () => {
    beforeEach(() => {
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('returns reservations', done => {
        let _Reservations = reservations(5)
    
        moxios.wait(() => {
            let request = moxios.request.mostRecent()
    
            request
                .respondWith({
                    status: 200,
                    response: _Reservations
                })
                .then((res: any) => {
                    equal(res, 'create_reservation', 'success')
                    done()
                })
        })
    })
    
})


