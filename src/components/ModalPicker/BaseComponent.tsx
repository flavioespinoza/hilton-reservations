'use strict';

import React from 'react';

export default class BaseComponent extends React.Component {
    _bind(...methods: any) {
        methods.forEach( (method: any) => this[method: any] = this[method].bind(this) );
    }
}
