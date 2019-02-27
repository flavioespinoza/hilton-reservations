import { equal, notEqual, deepEqual } from 'assert'
import axios from 'axios'
import moxios from 'moxios'
import sinon from 'sinon'

const USER_FRED = {
    hotelName: 'Bedrock Hilton',
    firstName: 'Fred',
    lastName: 'Flintstone',
    arrivalDate: '1/1/1',
    departureDate: '2/1/1'
}

const _URI = 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'

const _MutationCreateReservation = obj => {
    return `
        mutation {
            createReservation(
                data: {
                    name: "${obj.name}"
                    hotelName: "${obj.hotel}"
                    arrivalDate: "${obj.arrivalDate}"
                    departureDate: "${obj.departureDate}"
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

describe('moxios', function() {
    it('should install', function() {
        let defaultAdapter = axios.defaults.adapter
        moxios.install()
        notEqual(axios.defaults.adapter, defaultAdapter)
        moxios.uninstall()
    })

    it('should uninstall', function() {
        let defaultAdapter = axios.defaults.adapter
        moxios.install()
        moxios.uninstall()
        equal(axios.defaults.adapter, defaultAdapter)
    })

    describe('requests', function() {
        let onFulfilled
        let onRejected

        beforeEach(function() {
            moxios.install()
            onFulfilled = sinon.spy()
            onRejected = sinon.spy()
        })

        afterEach(function() {
            moxios.uninstall()
        })

        it('should intercept requests', function(done) {
            
            axios.get('/reservations/12346')

            moxios.wait(function() {
                let request = moxios.requests.mostRecent()
                equal(moxios.requests.count(), 1)
                done()
            })
        })

        it('should mock responses', function(done) {

            axios.get('/reservations/12346').then(onFulfilled, onRejected)

            moxios.wait(function() {
                let request = moxios.requests.mostRecent()
                request
                    .respondWith({
                        status: 200,
                        response: USER_FRED
                    })
                    .then(function() {
                        let response = onFulfilled.getCall(0).args[0]
                        equal(onFulfilled.called, true)
                        equal(response.status, 200)
                        deepEqual(response.data, USER_FRED)
                        done()
                    })
            })
        })

        it('should mock responses Error', function(done) {
            
            axios.get('/reservations/12346').then(onFulfilled, onRejected)

            moxios.wait(function() {
                let request = moxios.requests.mostRecent()
                request
                    .respondWith({
                        status: 404
                    })
                    .then(function() {
                        equal(onFulfilled.called, false)
                        equal(onRejected.called, true)
                        done()
                    })
            })
        })

        it('should mock one time', function(done) {
            moxios.uninstall()

            moxios.withMock(function() {
                axios.get(_URI).then(onFulfilled)

                moxios.wait(function() {
                    let request = moxios.requests.mostRecent()
                    request
                        .respondWith({
                            status: 200,
                            response: USER_FRED
                        })
                        .then(function() {
                            equal(onFulfilled.called, true)
                            done()
                        })
                })
            })
        })

        it('should timeout requests one time', function(done) {
            moxios.uninstall()

            moxios.withMock(function() {
                axios.get(_URI)

                moxios.wait(function() {
                    let request = moxios.requests.mostRecent()
                    request.respondWithTimeout().catch(function(err) {
                        equal(err.code, 'ECONNABORTED')
                        done()
                    })
                })
            })
        })

        it('should stub requests', function(done) {
            moxios.stubRequest(_URI, {
                status: 200,
                response: USER_FRED
            })

            axios.get(_URI).then(onFulfilled)

            moxios.wait(function() {
                let response = onFulfilled.getCall(0).args[0]
                deepEqual(response.data, USER_FRED)
                done()
            })
        })

        it('should stub timeout', function(done) {
            moxios.stubTimeout(_URI)

            axios.get(_URI).catch(onRejected)

            moxios.wait(function() {
                let err = onRejected.getCall(0).args[0]
                deepEqual(err.code, 'ECONNABORTED')
                done()
            })
        })

        it('should stub requests RegExp', function(done) {
            moxios.stubRequest(/\/reservations\/\d*/, {
                status: 200,
                response: USER_FRED
            })

            axios.get('/reservations/12346').then(onFulfilled)

            moxios.wait(function() {
                let response = onFulfilled.getCall(0).args[0]
                deepEqual(response.data, USER_FRED)
                done()
            })
        })

        describe('stubs', function() {
            it('should track multiple stub requests', function() {
                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                equal(moxios.stubs.count(), 2)
            })

            it('should find single stub by method', function() {
                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                let request = moxios.stubs.get('PUT', '/reservations/12346')

                notEqual(request, undefined)
            })

            it('should remove a single stub by method', function() {
                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                moxios.stubs.remove('PUT', '/reservations/12346')
                equal(moxios.stubs.count(), 3)
            })

            it('should not find request on invalid method', function() {
                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                axios.put('/reservations/12346', USER_FRED)
                let request = moxios.requests.get('TEST')

                equal(request, undefined)
            })

            it('should find request after multiple stubs using same URI', function(done) {
                moxios.stubOnce('POST', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                axios.put('/reservations/12346', USER_FRED).then(onFulfilled)

                moxios.wait(function() {
                    let response = onFulfilled.getCall(0).args[0]
                    equal(response.status, 204)
                    let request = moxios.requests.get('PUT', '/reservations/12346')
                    notEqual(request, undefined)
                    done()
                })
            })

            it('Should stub and find multiple requests by method', function(done) {
                moxios.stubOnce('PUT', '/reservations/12346', {
                    status: 204
                })

                moxios.stubOnce('GET', '/reservations/12346', {
                    status: 200,
                    response: USER_FRED
                })

                axios.put('/reservations/12346', USER_FRED).then(onFulfilled)
                axios.get('/reservations/12346', {}).then(onFulfilled)

                moxios.wait(function() {
                    equal(onFulfilled.calledTwice, true)

                    let response1 = onFulfilled.getCall(0).args[0]
                    let response2 = onFulfilled.getCall(1).args[0]
                    equal(response1.status, 204)
                    equal(response2.status, 200)
                    equal(response2.data.firstName, 'Fred')

                    let request = moxios.requests.get('PUT', '/reservations/12346')
                    notEqual(request, undefined)

                    request = moxios.requests.get('GET', '/reservations/12346')
                    notEqual(request, undefined)

                    done()
                })
            })
        })
    })
})
