//
function buildResponse(request, apiResponse) {
    let hdrs = {
        'Content-Type': 'application/json',
        'X-Request-Id': request.get('X-Request-Id')
    }
    if (apiResponse.hdrs) {
        for (h in apiResponse.hdrs) {
            hdrs[h] = apiResponse.hdrs[h]
        }
    }
    //
    let response = {
        hdrs: hdrs,
        status: apiResponse.code,
        msg: {
            resp: apiResponse.resp,
            msg: apiResponse.msg
        }
    }
    //
    return response
}
//
module.exports = { buildResponse }