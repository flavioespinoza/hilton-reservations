export const $ContainerBase = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 12
}

export const $DateInput = {
    paddingLeft: 8,
    paddingTop: 9,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 2,
    padding: 4
}

export const $TextInput = {
    paddingLeft: 8,
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 2,
    marginTop: 12,
    padding: 4
}

export const $Device = {
    selection: {
        ios: {
            width: '100%',
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 0,
            color: 'black',
            paddingRight: 30 // to ensure the text is never behind the icon
        },
        android: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 2,
            borderColor: 'gray',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30 // to ensure the text is never behind the icon
        } 
    }
}

export const $PrimaryColor = '#4388D6'
export const $CancelColor = 'red'

export const $Color = {
    primary: {
        bg: {
            backgroundColor: $PrimaryColor
        },
        text: {
            color: $PrimaryColor
        },
        color: $PrimaryColor
    },
    cancel: {
        bg: {
            backgroundColor: $CancelColor
        },
        text: {
            color: $CancelColor
        },
        color: $CancelColor
    }
}
