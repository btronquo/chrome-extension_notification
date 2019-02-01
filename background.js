/**
 * @author Boris Tronquoy <b.tronquoy@gmail.com>
 * @description Get notified
 * @version 20181207
 */
'use strict';

// --- configuration --- //
// apiUrl: api url to test every x secondes (eg: https//test.com/api/example/)
// timer: in milliseconds (eg: 5000 for 5 seconds)
// --------------------- //
const apiUrl = ''
const timer = 5000

var notificationNumber = 0;

function issueCheck() {
    fetch(apiUrl).then(response => 
        response.json().then(data => ({
            data: data,
            status: response.status
        })
    ).then(res => {
        if(res.data.data.length !== 0) {
            res.data.data.forEach(function(element) {
                notificationNumber++
                chrome.notifications.create(element.id, {
                    type: 'basic',
                    iconUrl: 'icon.png',
                    title: 'Notification: Hey! Something happened!',
                    message: 'Issue numéro: ' + element.id
                 }, function(notificationId) {});
                 
            });
            issueBadge(notificationNumber)
        }
    }));
}

function issueBadge(i) {
    var num = i.toString();
    chrome.browserAction.setBadgeText({text: num});
}

// On click, deleting notifications
chrome.browserAction.onClicked.addListener(function (tab) { 
    issueBadge(0)
    notificationNumber = 0;
});

setInterval(issueCheck, timer);