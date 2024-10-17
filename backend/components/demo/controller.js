const {doCreateData,doGetData} = require("./service");

const createData = async(req,res) => {
    const { title, description } = req.body;
    const payload = {
        title,
        description
    }
    const response = await doCreateData(payload);
    res.send(response);
}

const getData = async(req,res) => {
    const response = await doGetData();
    res.send(response);
}

module.exports = {
    createData,
    getData
}