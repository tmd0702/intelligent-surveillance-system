export function isValidFormData(data) {
    try {
        new URLSearchParams(data);
        return true;
    } catch (error) {
        return false; // Invalid data
    }
}

export function isValidJSON(data) {
    try {
        JSON.parse(data);
        return true;
    } catch (error) {
        return false;
    }
}

export function isValidXML(xmlString) {
    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

        const errors = xmlDoc.getElementsByTagName('parsererror');
        return errors.length === 0;
    } catch (error) {
        return false;
    }
}

function isStringArray(str) {
    try {
        const parsedArray = JSON.parse(str);
        return Array.isArray(parsedArray);
    } catch (error) {
        return false;
    }
}
function isStringObject(str) {
    try {
        const parsedObject = JSON.parse(str);
        return typeof parsedObject === 'object' && !Array.isArray(parsedObject);
    } catch (error) {
        return false;
    }
}
function isDateString(str) {
    const date = new Date(str);
    return !isNaN(date.getTime());
}
function isTimeString(str) {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

    return timePattern.test(str);
}
export function isValidDatatype(datatype, value) {
    if (value == '' || value == 'undefined') {
        return true;
    } else {
        switch (datatype.toLowerCase()) {
            case 'number':
                return !isNaN(value);
            case 'string':
                return typeof value === 'string' || value instanceof String;
            case 'array':
                return isStringArray(value);
            case 'object':
                return isStringObject(value);
            case 'date':
                return isDateString(value);
            case 'time':
                return isTimeString(value);
            default:
                return true;
        }
    }
}
