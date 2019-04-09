import React from 'react'
import App from './app'
import renderer from 'react-test-renderer'


describe('App', () => {
    describe('rendering', () => {
        it('should render <App />', () => {
            const tree = renderer.create( < App / > ).toJSON()
            expect(tree).toMatchSnapshot()
        })
    })
})