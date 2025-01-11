import 'react-native-get-random-values';
const { v5: uuidv5, v4: uuidv4, parse: uuidParse } = require('uuid');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import { PermissionsAndroid } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
// import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from "react-native-file-viewer";
import RNFS from 'react-native-fs';
import { Alert, Platform } from 'react-native';
export const scrollToTop = (scrollRef) => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }
export function getFileSizeFromBase64(base64String) {
    let padding, inBytes, base64Length;

    if (base64String.endsWith('==')) {
      padding = 2;
    } else if (base64String.endsWith('=')) {
      padding = 1;
    } else {
      padding = 0;
    }

    base64Length = base64String.length;
    inBytes = (base64Length * 3) / 4 - padding;

    const inKB = inBytes / 1024;
    return inKB;
};
export const generateUUIDv4 = () => {
    return uuidv4();
};
export function generateAutonum() {
    const padZero = (num, length) => num.toString().padStart(length, '0');

    const date = new Date();
    const YY = padZero(date.getFullYear() % 100, 2);
    const MM = padZero(date.getMonth() + 1, 2);
    const DD = padZero(date.getDate(), 2);
    const HH = padZero(date.getHours(), 2);
    const mm = padZero(date.getMinutes(), 2);
    const ss = padZero(date.getSeconds(), 2);
    const ttt = padZero(date.getMilliseconds(), 3);

    const randomString = () => Math.random().toString(36).substr(2, 9).toUpperCase();
    const randomPart = randomString();

    const part1 = randomPart.slice(0, 4);
    const part2 = randomPart.slice(4, 8);

    const code = `${YY}${MM}${DD}-${HH}${mm}${ss}${ttt}${part1}-${part2}`;
    return code;
  }
export function isNumberAndNegative(str) {
    const num = parseFloat(str);
    if (!isNaN(num) && num <- 0) {
        return true; 
    }

    return false;
}
export function forcePositive(number) {
    try {
        return Math.abs(number);
    } catch(error) {
        return number;
    }
};
export function getLocalStorageItem(key) {
    return JSON.parse(localStorage.getItem(key));
}
export const hasAtLeastOneValue = (obj) => {
    return Object.values(obj).some(value => value !== null && value !== undefined && value !== '' && value != '0' && value != 0);
};
export const isNotNullValue = (value) => {
    return value !== null && value !== undefined && value !== '' && value != '0' && value != 0 && value != '0.00' && value != 'N/A';
}
export const allFieldsHaveValue = (obj) => {
    return Object.values(obj).every(value => value !== null && value !== undefined && value !== '' && value != '0' && value != 0 && value != '0.00');
};
export function convertMonthNumberToName(monthYear) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    try {
        monthYear = monthYear.toString();
        const monthIndex = parseInt(monthYear.substring(4, monthYear.length), 10) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
        return months[monthIndex];
        } else {
        return 'Invalid month';
        }
    } catch(error) {
        
    }
  }
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get base64 string without the data URL prefix
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob); // Convert Blob to Data URL
    });
  };
  async function checkStoragePermission() {
    if (Platform.OS === 'android') {
      try {
        const permissionStatus = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (permissionStatus) {
          console.log('Storage permission is already granted');
        } else {
          console.log('Storage permission is not granted');
          await requestStoragePermission();
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }
export async function requestStoragePermission() {
    let permissions = [
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
]    
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can write to storage');
            } else {
                //console.log('granted info', granted)
                //Alert.alert('Permission Denied', 'Cannot access storage');
            }
        } catch (err) {
            console.log('grant permission error', err);
        }
    }
}
export async function ensureDirectoryExists(path) {
    const dirPath = path.substring(0, path.lastIndexOf('/'));
    try {
      const dirExists = await RNFS.exists(dirPath);
      if (!dirExists) {
        await RNFS.mkdir(dirPath);
      }
    } catch (error) {
      console.error('Error ensuring directory exists:', error);
      throw error;
    }
  }
export async function downloadFile(file) {
    if (file) {
        let destPath = `${RNFS.DocumentDirectoryPath}/${file.filename}`;
        // const dirExists = await RNFS.exists(destPath);
        // if (!dirExists) {
        //     destPath = `${RNFS.DownloadDirectoryPath}/${file.filename}`;
        // }
        if (file.documentcode) {
            try {
                const response = await RNBlobUtil.fetch('POST', 'https://erp.tljoc.com.vn:4435/DirectRouter/Index', {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }, new URLSearchParams({
                  extTID: 99,
                  extAction: 'FrmFdDocument',
                  extMethod: 'download',
                  extType: 'rpc',
                  extUpload: false,
                  extDownload: true,
                  documentcode: file.documentcode,
                }).toString());
                const imageData = response.data;
                await requestStoragePermission();
                //await ensureDirectoryExists(destPath);
                await RNBlobUtil.fs.writeFile(destPath, imageData, 'base64')
                     .then(() => {
                        console.log(`File downloaded to ${destPath}`);
                        FileViewer.open(destPath, { showOpenWithDialog: true })
                            .then(() => {
                                console.log(`File opened from ${destPath}`);
                            })
                            .catch((error) => {
                                console.error('Error opening file:', error);
                            });
                    })
                    .catch((error) => {
                        throw error;
                        // console.error('Error writing file:', error);
                    });
              } catch (error) {
                console.error('Error:', error);
                throw error;
              }
        } else {
            console.error('No valid data or URI provided for the file');
        }
    }
};


export async function getBase64FromContentUri(contentUri) {
    try {
        const realURI = contentUri;
        const base64Data = await RNBlobUtil.fs.readFile(
            realURI,
            'base64',
          );
        return base64Data;
    } catch (error) {
        console.log('Error reading file:', error);
        throw error;
    }
};
export function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
export function formatDdMmYyyyDateFromDateObject(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
export function formatYYYYMMDDDate(date) {
    try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    
    } catch(err) {
        console.log("formatYYYYMMDDDate err", err)
        return date;
    }
  
}
  
export function formatDdMmYyyyDate(isoDateString) {
    if (!isoDateString) return '';
    const date = new Date(isoDateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};
export function getFirstAndLastDateOfMonth(month, year) {

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1);

    return {
        firstDate: firstDayOfMonth.toISOString(),
        lastDate: lastDayOfMonth.toISOString(),
    };
}

export async function storeToken(username, token) {
    try {
        await Keychain.setGenericPassword(username, token);
      } catch (error) {
        console.log('Could not save token to Keychain: ', error);
    }
}

export async function resetToken() {
    await Keychain.resetGenericPassword();
}

export async function getToken() {
    try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
            console.log(
              'Credentials successfully loaded for user ' + credentials.username
            );
          } else {
            console.log('No credentials stored');
          }
          return credentials.password;
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
    }
}
export async function getRememberMeCheck() {
    try {
        const rememberMe = await AsyncStorage.getItem('remember_me');
        if (rememberMe !== null) {
          return JSON.parse(rememberMe);
        }
      } catch (error) {
        console.log(error);
      }
}
export async function storeRememberMeCheck(check, username) {
    try {
        await AsyncStorage.setItem('remember_me', JSON.stringify({
            check, username
        }));

    } catch (err) {
        console.log(err);
    }
}
export async function storeUserInfo(userInfo) {
    try {
        await AsyncStorage.setItem('user_info', JSON.stringify(userInfo));

    } catch (err) {
        console.log(err);
    }
}

export async function storeLoginStatus(status) {
    try {
        await AsyncStorage.setItem('loggedIn', status);

    } catch (err) {
        console.log(err);
    }
}
export function extractTimeString(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    return {hours, minutes};
}
function convertToTimeString(hour, minute, second=0) {
    const hourStr = String(hour).padStart(2, '0');
    const minuteStr = String(minute).padStart(2, '0');
    const secondStr = String(second).padStart(2, '0');
    return `${hourStr}:${minuteStr}:${secondStr}`;
}

export async function getUserInfo() {
    try {
        const userInfo = await AsyncStorage.getItem('user_info');
        if (userInfo !== null) {
          return JSON.parse(userInfo);
        }
      } catch (error) {
        console.log(error);
      }
}
export async function getLoginStatus() {
    try {
        const status = await AsyncStorage.getItem('loggedIn');
        return status;
      } catch (error) {
        console.log(error);
      }
}

export function readDataURLFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataURL = event.target.result;
            resolve(dataURL);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
export function readTextFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const dataURL = event.target.result;
            resolve(dataURL);
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsText(file);
        // reader.readAsArrayBuffer(file);
    });
}
export function readBytesFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (event) {
            const arrayBuffer = event.target.result;
            const byteArray = new Uint8Array(arrayBuffer);
            resolve(JSON.stringify(byteArray));
        };

        reader.onerror = function (error) {
            reject(error);
        };

        // reader.readAsDataURL(file);
        reader.readAsArrayBuffer(file);
    });
}

export const requiredError = (value, title) => {
    if (!value) {
        return `${title} is required!`;
    } 
    return '';
}

export function generateUUID(id) {

    const namespace = uuidParse('6ba7b810-9dad-11d1-80b4-00c04fd430c8');
    const generatedUUID = uuidv5(id.toString(), namespace);
    return generatedUUID;
}
export function dateDiffInDays(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const diffInMs = utc2 - utc1;

    return Math.floor(diffInMs / oneDay);
}
export function convertToTitleCase(str) {
    if (!str) {
        return '';
    }
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase().concat(word.substr(1));
        })
        .join(' ');
}

export function formatDateTime(isoDateTimeString) {
    const date = new Date(isoDateTimeString);

    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);

    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
};

export function formatDate(inputDateString) {
    const date = new Date(inputDateString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
export function generateDateOverviewText(date) {
    let key = 'minute';
    const dateDiff = calculateDateDifference(date);
    for (let unit in dateDiff) {
        if (dateDiff[unit] <= 0) {
            break;
        }
        key = unit;
    }
    return `${dateDiff[key] > 0 ? ` ${dateDiff[key]}` + (dateDiff[key] > 1 ? ` ${key}s ago` : ` ${key} ago`) : 'Recently'
        }`;
}
export function formatNumberWithCommas(input) {
    try {
        const number = parseFloat(input);
        if (isNaN(number)) {
            throw new Error("Input is not a valid number.");
        }
        return number.toLocaleString('en-US');
    } catch(error) {
        return input;
    }

}
export function formatNumberToK(value) {
    if (value >= 1000) {
        const formattedValue = (value / 1000).toFixed(2);
        return `${formattedValue}k`;
    } else {
        return value.toString();
    }
}
export function numericMonthToAbbreviation(numericMonth) {
    const monthAbbreviations = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    // Check if the numericMonth is within a valid range (1 to 12)
    if (numericMonth >= 1 && numericMonth <= 12) {
        return monthAbbreviations[numericMonth - 1];
    } else {
        // Handle invalid month values
        return 'Invalid Month';
    }
}
export function calculateDateDifference(targetDateStr) {
    // Convert the target datetime string to a Date object
    const targetDate = new Date(targetDateStr);
    const currentDate = new Date();
    const timeDifference = currentDate - targetDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Calculate the difference in months and years
    const targetYear = targetDate.getFullYear();
    const targetMonth = targetDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const yearsDifference = targetYear - currentYear;
    const monthsDifference = targetMonth - currentMonth + 12 * yearsDifference;
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(minutesDifference / 60);
    return {
        minute: minutesDifference,
        hour: hoursDifference,
        day: daysDifference,
        month: monthsDifference,
        year: yearsDifference,
    };
}
export function bytesToKB(bytes) {
    return bytes / 1024;
}

export function getFirstAndLastDateOfMonth2(yearMonth) {
    const year = Math.floor(yearMonth / 100);
    const month = yearMonth % 100 - 1;
    const firstDate = new Date(year, month, 1);
    const lastDate = new Date(year, month + 1, 0);

    return {
        'firstDate': firstDate.toString(),
        'lastDate': lastDate.toString()
    };
}


export function formatCurrency(value, fractionDigits=2) {
    try {
        return value.toLocaleString('en-US', { style: 'decimal', minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
    } catch (error) {
        console.log(error);
        return value;
    }
}

export function pad(num, places) {
    return String(num).padStart(places, '0')
}

export function getUserAvatarUrl() {
    return localStorage.getItem('avatar_url');
}


export async function getUserFullName() {
    const userInfo = await getUserInfo();
    return userInfo.first_name + ' ' + userInfo.last_name;
}

export function getNameById(id, data) {
    for (const item of data) {
        if (item.id === id) {
            return item.name;
        }
    }
    throw new Error(`ID ${id} not found in given data`);
}

export function getFileExtensionFromName(urlString) {
    return urlString.split(/[#?]/)[0].split('.').pop().trim().toLowerCase();
}

  export const removeUserInfo = async () => {
    try {
      await AsyncStorage.removeItem('user_info');
    } catch (e) {
      console.error(e);
    }
  };

  export function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); 
  }