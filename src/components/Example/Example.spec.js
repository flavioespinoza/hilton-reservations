import React from 'react'
import { shallow } from 'enzyme'
import Example from './Example'
import Chance from 'chance'

const chance = new Chance()

describe('Testing Example component update', () => {
    it('renders as expected', () => {
        const wrapper = shallow(<Example message={chance.address()} />)
        expect(wrapper).toMatchSnapshot()
        wrapper.setProps({ message: chance.address() })
        expect(wrapper).toMatchSnapshot()
    })
})
