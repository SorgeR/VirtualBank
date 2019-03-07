import ConstantsHolder from "./ConstantsHolder";
var ServiceMessage = /** @class */ (function () {
    function ServiceMessage() {
    }
    ServiceMessage.myBaseUrl = "http://" + ConstantsHolder.IP_PORT + "/api/messages";
    ServiceMessage.addMessage = function (idSender, idReceiver, text) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceMessage.myBaseUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "IdSender": idSender,
                    "IdReceiver": idReceiver,
                    "Text": text,
                    "Date": (new Date()).toISOString()
                }),
            })
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("The message can't be empty!");
                }
            })
                .then(function (response) {
                var messageResponse = response;
                resolve(messageResponse);
            })
                .catch(function (error) {
                reject(error);
            });
        });
    };
    ServiceMessage.getMessages = function (idSender, idReceiver) {
        return new Promise(function (resolve, reject) {
            fetch(ServiceMessage.myBaseUrl + "/" + idSender + "/" + idReceiver)
                .then(function (response) { return response.json(); })
                .then(function (responseJson) {
                var messages = { data: responseJson };
                resolve(messages);
            })
                .catch(function (error) {
                // let err={message:error.message"};
                reject(error);
            });
        });
    };
    return ServiceMessage;
}());
export default ServiceMessage;
//# sourceMappingURL=ServiceMessage.js.map