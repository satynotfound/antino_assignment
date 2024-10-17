const Data = require("../../models/data");
const {sendTaskToQueue} = require("../../utils/sqs");

const doCreateData = async (payload) => {
  try {
    const { title, description } = payload;
    const newData = await Data.create({ title, description });
    await sendTaskToQueue(newData._id);
    console.log(newData);
    return {
      data: newData
    };
  } catch (err) {
    throw err;
  }
};

const doGetData = async() => {
  try{
    const demoDetails = await Data.find({});
    return{
      statusCode:200,
      data:demoDetails
    }
  }catch(err){
    throw err;
  }
}

module.exports = {
    doCreateData,
    doGetData
}