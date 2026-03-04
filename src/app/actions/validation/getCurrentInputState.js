export function getCurrentInputState( 
    field, 
    value = '', 
    error = null, 
    isFocused = false, 
    disabled = false 
) {

    if (disabled) {
        return { state: 'disabled', message: '' }
    }
    
    const val = value ? value.toString().trim() : ''
    
    if (val === '') {
        if (!isFocused && error) {
            return { state: 'error', message: error.message}
        }
        return { state: 'default', message: '' }
    }

    if (!isFocused && error) {
        return { state: 'error', message: error.message}
    }

    switch (field) {
        case 'email': {
            if (!val.includes('@')) {
                return { state: 'warning', message: 'Email must include @' }
            }
            if (!val.endsWith('@gmail.com')) {
                return { state: isFocused ? 'warning' : 'error', message: 'Use @gmail.com for best compatibility' }
            }   
            return { state: 'success', message: 'Looks good!' }
        }

        case 'password': {
            if (val.length < 8) {
                return { state: 'warning', message: 'Too short, at least 8 characters' }
            }
            return { state: 'success', message: 'Strong enough!' }
        }

        case 'firstName':
        case 'lastName': {
            if (val.length < 2) {
                return { state: 'warning', message: 'Too short, at least 2 characters' }
            }
            return { state: 'success', message: 'Perfect!' }
        }

        default:
            return { state: 'success', message: 'Looks good!' }
    }
}