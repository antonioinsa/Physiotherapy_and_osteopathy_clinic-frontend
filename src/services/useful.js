import dayjs from 'dayjs'
export const validator = (type, value, confirmValue) => {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/
    const dniRegex = /^[0-9]{8}[A-Za-z]$/
    const spanishPhoneRegex = /^(?:\+34|0034|34)?[6-9]\d{8}$/
    const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30']
    const today = dayjs()

    switch (type) {

        case 'email':
            if (!emailRegex.test(value)) {
                return 'Email format is not valid'
            }

            if (!value) {
                return 'Must provide an email'
            }

            if (typeof (value) !== "string") {
                return 'Incorrect email'
            }

            if (value.length > 100) {
                return 'Maximum 100 characters'
            }


        case 'password':
            if (!passwordRegex.test(value)) {
                return 'Password must be between 6 and 12 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
            }

            if (!value) {
                return 'Must provide a password'
            }

            if (typeof (value) !== "string") {
                return 'Incorrect password'
            }

            if (value.length > 12) {
                return 'Maximum 12 characters'
            }

        case 'confirmPassword':
            if (value !== confirmValue) {
                return 'Passwords must match'
            }

            if (!confirmValue) {
                return 'Must confirm password'
            }

            if (typeof (confirmValue) !== "string") {
                return 'Incorrect password'
            }

            if (confirmValue.length > 12) {
                return 'Maximum 12 characters'
            }

        case 'dni':
            if (!dniRegex.test(value)) {
                return 'Document ID is not valid'
            }

            if (!value) {
                return 'Must provide a document ID'
            }

            if (typeof (value) !== "string") {
                return 'Incorrect document ID'
            }

            if (value.length > 9) {
                return 'Maximum 8 letters and 1 character'
            }

        case 'phone':
            if (!spanishPhoneRegex.test(value)) {
                return 'Phone is not valid'
            }

            if (!value) {
                return 'Must provide a phone'
            }

            if (typeof (value) !== "string") {
                return 'Incorrect phone'
            }

            if (value.length > 9) {
                return 'Maximum 9 characters'
            }

        case 'name':
        case 'lastName':
            if (!value) {
                return 'Must provide a name'
            }

            if (value !== undefined && value.trim() !== '' && value.length >= 50) {
                return 'Maximum 50 characters'
            }

        case 'service':
            if (!value) {
                return 'Must provide a service'
            }
            const validService = ['physiotherapy', 'osteopathy']
            const serviceTrue = value.toLowerCase()

            if (!validService.includes(serviceTrue)) {
                return 'Incorrect service, please choose a valid service (physiotherapy, osteopathy)'
            }

        case 'date':
            if (!value) {
                return 'Must provide a date'
            }

            if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
                return 'Incorrect date, please choose a valid date DD-MM-YYYY'
            }

            if (dayjs(value, "DD-MM-YYYY").isBefore(today, 'day')) {
                return 'Current date is before selected date. Please, choose a valid date'
            }

        case 'time':
            if (!value) {
                return 'Must provide a hour'
            }

            if (typeof (value) !== "string") {
                return 'Incorrect hour'
            }

            if (!validHours.includes(value)) {
                return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 14:00, 16:00, 17:15, 18:30)'
            }

            if (dayjs(value, "HH:mm").isBefore(today, 'minute')) {
                return 'Please choose an other available hour'
            }

        case 'appointment':
            if (dayjs(value, "DD-MM-YYYY").isSame(today, 'day') && dayjs(value, "HH:mm").isBefore(today, 'minute')) {
                return 'Current hour is before selected hour. Please choose a valid hour'
            }

            if (dayjs(value, "DD-MM-YYYY").isSame(today, 'day') && validHours.includes(value)) {
                return 'Please choose another available hour or another day'
            }

            if (dayjs(value, "DD-MM-YYYY").isBefore(today, 'day')) {
                return 'Current date is before selected date. Please choose a valid date'
            }

            if (!validHours.includes(value)) {
                return 'Please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)'
            }

        case 'town':
        case 'country':
            if (value.length < 4 || value.length > 30) {
                return 'Minimum 4 and Maximum 30 characters'
            }

            if ((/^\s|\s$/.test(value)).test(value)) {
                return 'Cannot contain spaces';
            }

            if (!/^[a-zA-Z0-9\s']+$/g.test(value)) {
                return 'Cannot contain special characters, except apostrophe';
            }

        case 'zipCode':
        case 'door':
            if (value.length !== 5) {
                return 'Must have exactly 5 characters'
            }

        case 'street':
            if (value.length < 4 || value.length > 100) {
                return 'Minimum 4 and Maximum 100 characters'
            }

            if ((/^\s|\s$/.test(value)).test(value)) {
                return 'Cannot contain spaces';
            }

            if (!/^[a-zA-Z0-9\s']+$/g.test(value)) {
                return 'Cannot contain special characters, except apostrophe';
            }

    }
}