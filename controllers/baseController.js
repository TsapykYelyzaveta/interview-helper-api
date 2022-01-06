module.exports = {
    sendError(res, status, message) {
        res.status(status).send({
            message: message
        });
    },

    sendResult(res, message, result) {
        res.send({
            message: message,
            result: Array.isArray(result)?[...result]:result
        });
    }
}
