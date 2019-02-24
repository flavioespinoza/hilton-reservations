import moxios from 'moxios'

// move this to an object that we can reuse
const oitnb = {
    rating: '0.8',
    title: 'Orange Is the New Black',
    year: '2013–',
    description:
        'The story of Piper Chapman, a woman in her thirties who is sentenced to fifteen months in prison after being convicted of a decade-old crime of transporting money for her drug-dealing girlfriend.',
    poster: 'oitnb.jpg',
    imdbID: 'tt2372162',
    trailer: 'th8WT_pxGqg'
}

// modify the addAPIData test to use the object
test('addAPIData', () => {
    expect(addAPIData(oitnb)).toMatchSnapshot()
})

// at the bottom
test('getAPIDetails', (done: Function) => {
    const dispatchMock = jest.fn()
    moxios.withMock(() => {
        getAPIDetails(oitnb.imdbID)(dispatchMock)
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request
                .respondWith({
                    status: 200,
                    response: oitnb
                })
                .then(() => {
                    expect(request.url).toEqual(`http://localhost:3000/${oitnb.imdbID}`)
                    expect(dispatchMock).toBeCalledWith(addAPIData(oitnb))
                    done()
                })
        })
    })
})
