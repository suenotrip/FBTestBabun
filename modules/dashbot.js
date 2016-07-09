var request = require("request");
//var Q = require("q");

function notifyin(message,senderId){
    //var deferred = Q.defer();
    
		//var post_data = {"apiKey":process.env.DASHBOT_API_KEY,"type" : "incoming"};

	  console.log("==dashbot data",post_data);

		  var options = {
		  uri: 'https://tracker.dashbot.io/platform=facebook&v=0.6.0&type=incoming&apiKey=process.env.DASHBOT_API_KEY',
		  method: 'POST',
		  json: {
            recipient: {
                id : senderId
            },
            message : message
        }
		};

		request(options, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			console.log("===dashbot response success") // Print the shortened url.
			

		  }
		  else{
			console.log("===failure dashbot response");
		  }
		});
		
    /* request({
        url: 'https://tracker.dashbot.io/platform=facebook&v=0.6.0',
        qs: {
            apiKey : process.env.DASHBOT_API_KEY,
			type:incoming
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
            //deferred.reject(err);
        }else{
            if(response.statusCode == 200){
                console.log("===sent message to FB");
				//dashbot.logOutgoingResponse(requestId, error, response);
                //deferred.resolve(body);
            }else{
                console.log("===error sending message",body);
                //deferred.reject(body);
            }
        }
    }); */
    //return deferred.promise;
}
//--------------------------------------------------------------------------------
function notifyout(message,senderId){
    //var deferred = Q.defer();
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
            //deferred.reject(err);
        }else{
            if(response.statusCode == 200){
                console.log("===sent message to FB");
				//dashbot.logOutgoingResponse(requestId, error, response);
                //deferred.resolve(body);
            }else{
                console.log("===error sending message",body);
                //deferred.reject(body);
            }
        }
    });
    //return deferred.promise;
}
//--------------------------------------------------------------------------------

exports.notifyin = notifyin;
exports.notifyout = notifyout;