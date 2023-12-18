import dayjs from 'dayjs';

export const validator = (type, value, confirmValue) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    const dniRegex = /^[0-9]{8}[A-Za-z]$/;
    const spanishPhoneRegex = /^(?:\+34|0034|34)?[6-9]\d{8}$/;
    const validHours = ['09:00', '10:15', '11:30', '12:45', '16:00', '17:15', '18:30'];
    const today = dayjs();

    switch (type) {
        case 'email':
            if (!value) {
                return 'Must provide an email';
            }

            if (typeof value !== 'string') {
                return 'Incorrect email';
            }

            if (value.length > 100) {
                return 'Maximum 100 characters';
            }

            if (!emailRegex.test(value)) {
                return 'Email format is not valid';
            }

            break;

        case 'password':
            if (!value) {
                return 'Must provide a password';
            }

            if (typeof value !== 'string') {
                return 'Incorrect password';
            }

            if (value.length > 12) {
                return 'Maximum 12 characters';
            }

            if (!passwordRegex.test(value)) {
                return 'Password must be between 6 and 12 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character';
            }

            break;

        case 'confirmPassword':
            if (!confirmValue) {
                return 'Must confirm password';
            }

            if (typeof confirmValue !== 'string') {
                return 'Incorrect password';
            }

            if (confirmValue.length > 12) {
                return 'Maximum 12 characters';
            }

            if (value !== confirmValue) {
                return 'Passwords must match';
            }

            break;

        case 'dni':
            if (!value) {
                return 'Must provide a document ID';
            }

            if (typeof value !== 'string') {
                return 'Incorrect document ID';
            }

            if (value.length > 9) {
                return 'Maximum 8 letters and 1 character';
            }

            if (!dniRegex.test(value)) {
                return 'Document ID is not valid';
            }

            break;

        case 'phone':
            if (!value) {
                return 'Must provide a phone';
            }

            if (typeof value !== 'string') {
                return 'Incorrect phone';
            }

            if (value.length > 9) {
                return 'Maximum 9 characters';
            }

            if (!spanishPhoneRegex.test(value)) {
                return 'Phone is not valid';
            }

            break;

        case 'name':
        case 'lastName':
            if (!value) {
                return 'Must provide a name';
            }

            if (value.trim().length < 3 || value.trim().length > 50) {
                return 'Minimum 3 characters and Maximum 50 characters';
            }

            break;

        case 'service':
            if (!value) {
                return 'Must provide a service';
            }

            const validService = ['physiotherapy', 'osteopathy'];
            const serviceTrue = value.toLowerCase();

            if (!validService.includes(serviceTrue)) {
                return 'Incorrect service, please choose a valid service (physiotherapy, osteopathy)';
            }

            break;

        case 'date':
            if (!value) {
                return 'Must provide a date';
            }

            if (!/^\d{2}-\d{2}-\d{4}$/.test(value)) {
                return 'Incorrect date, please choose a valid date DD-MM-YYYY';
            }

            if (dayjs(value, 'DD-MM-YYYY').isBefore(today, 'day')) {
                return 'Current date is before selected date. Please choose a valid date';
            }

            break;

        case 'time':
            if (!value) {
                return 'Must provide an hour';
            }

            if (typeof value !== 'string') {
                return 'Incorrect hour';
            }

            if (!validHours.includes(value)) {
                return 'Incorrect hour, please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)';
            }

            if (dayjs(value, 'HH:mm').isBefore(today, 'minute')) {
                return 'Please choose another available hour';
            }

            break;

        case 'appointment':
            if (dayjs(value, 'DD-MM-YYYY').isSame(today, 'day') && dayjs(value, 'HH:mm').isBefore(today, 'minute')) {
                return 'Current hour is before selected hour. Please choose a valid hour';
            }

            if (dayjs(value, 'DD-MM-YYYY').isSame(today, 'day') && validHours.includes(value)) {
                return 'Please choose another available hour or another day';
            }

            if (dayjs(value, 'DD-MM-YYYY').isBefore(today, 'day')) {
                return 'Current date is before selected date. Please choose a valid date';
            }

            if (!validHours.includes(value)) {
                return 'Please choose a valid hour (09:00, 10:15, 11:30, 12:45, 16:00, 17:15, 18:30)';
            }

            break;

        case 'town':
        case 'country':
            if (value.length < 4 || value.length > 30) {
                return 'Minimum 4 and Maximum 30 characters';
            }

            if (/\s/.test(value) && /^\s|\s$/.test(value)) {
                return 'Cannot contain spaces at the beginning or end';
            }

            if (!/^[a-zA-Z0-9\s']+$/g.test(value)) {
                return 'Cannot contain special characters, except apostrophe';
            }

            break;

        case 'zipCode':
            if (value.length !== 5) {
                return 'Must have exactly 5 characters';
            }

            break;

        case 'door':
            if (value.length < 1 || value.length > 4) {
                return 'Minimum 1 and Maximum 4 characters';
            }

            if (!/\d/.test(value)) {
                return 'Must contain at least one number';
            }

            if (!/^[a-zA-Z0-9]{0,4}$/.test(value)) {
                return 'Maximum 4 characters';
            }

            if (/\s/.test(value) && /^\s|\s$/.test(value)) {
                return 'Cannot contain spaces at the beginning or end';
            }

            if (!/^[a-zA-Z0-9\s]*$/g.test(value)) {
                return 'Cannot contain special characters';
            }

            break;

        case 'street':
            if (value.length < 4 || value.length > 100) {
                return 'Minimum 4 and Maximum 100 characters';
            }

            if (/\s/.test(value) && /^\s|\s$/.test(value)) {
                return 'Cannot contain spaces at the beginning or end';
            }

            if (!/^[a-zA-Z0-9\s']+$/g.test(value)) {
                return 'Cannot contain special characters, except apostrophe';
            }

            break;
    }
};
