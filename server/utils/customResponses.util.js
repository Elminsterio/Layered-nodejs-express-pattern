
exports.responseOkArray = (req, res, items) => {
    return res.status(200).json({
        results: items
    });
}

exports.responseOk = (req, res, item) => {
    return res.status(200).json({
        result: item
    });
}

exports.responseOkElementDeleted = (req, res) => {
    return res.status(200).json({});
}

exports.responseOkElementCreated = (req, res, item) => {
    return res.status(201).json({
        result: item
    });
}

