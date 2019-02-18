import 'react-native'
import 'jest-enzyme'
import 'react-native-mock-render/mock'
import Enzyme, { configure, shallow, mount, render } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { JSDOM } from 'jsdom'
import { Url } from 'url';
import { HttpLink } from 'apollo-boost';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src: Window, target: HttpLink) {
    Object.defineProperties(target, {
        ...Object.getOwnPropertyDescriptors(src),
        ...Object.getOwnPropertyDescriptors(target)
    })
}

global.window = window
global.document = window.document
global.navigator = {
    userAgent: 'node.js'
}
global.requestAnimationFrame = function(callback: BlobCallback) {
    return setTimeout(callback, 0)
}
global.cancelAnimationFrame = function(id: string | number | any) {
    clearTimeout(id)
}
copyProps(window, global)

configure({ adapter: new Adapter() })

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error
console.error = (message: string) => {
    if (message.startsWith('Warning:')) {
        return
    }

    originalConsoleError(message)
}
