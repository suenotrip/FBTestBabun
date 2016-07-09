var request = require("request");
var Q = require("q");

function notifyin(message){
    var deferred = Q.defer();
    
	//const requestId = dashbot.logOutgoing(requestData);
    request({
        url: 'https://tracker.dashbot.io/platform=facebook&v=0.6.0',
        qs: {
            apiKey : process.env.DASHBOT_API_KEY,
			type:incoming
        },
        method: 'POST',
        json : {
            
            message : message
        }
    },function(err,response,body) {
        if(err){
            console.log("===error while sending message to FB: ", err.message);
            deferred.reject(err);
        }else{
            if(response.statusCode == 200){
                console.log("===sent message to FB");
				//dashbot.logOutgoingResponse(requestId, error, response);
                deferred.resolve(body);
            }else{
                console.log("===error sending message",body);
                deferred.reject(body);
            }
        }
    });
    return deferred.promise;
}
//--------------------------------------------------------------------------------
function notifyout(message,senderId){
    var deferred = Q.defer();
    console.log("===sending message to: ",senderId);
	//const requestId = dashbot.logOutgoing(requestData);
    request({
        url: 'https://tracker.dashbot.io/platform=facebook&v=0.6.0',
        qs: {
            apiKey : process.env.DASHBOT_API_KEY,
			type:outgoing
        },
        method: 'POST',
        json : {
            recipient: {
                id : senderId
            },
            message : message
        }
    },function(err,response,body) {
        if(err){
            console.log("===error while sending message to FB: ", err.message);
            deferred.reject(err);
        }else{
            if(response.statusCode == 200){
                console.log("===sent message to FB");
				//dashbot.logOutgoingResponse(requestId, error, response);
                deferred.resolve(body);
            }else{
                console.log("===error sending message",body);
                deferred.reject(body);
            }
        }
    });
    return deferred.promise;
}
//--------------------------------------------------------------------------------

exports.notifyin = notifyin;
exports.notifyout = notifyout;