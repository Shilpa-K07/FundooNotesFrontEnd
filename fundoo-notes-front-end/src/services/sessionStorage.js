/*************************************************************************
* Purpose : to set token in headers
*
* @file : sessionStorage.js
* @author : Shilpa K <shilpa07udupi@gmail.com>
* @version : 1.0
* @since : 14/01/2021
*
**************************************************************************/

const headers = {
    'Content-Type': 'application/json',
    token: sessionStorage.token
};
module.exports = headers;
