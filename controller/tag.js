const model = require("../models/Tag");

let Tag = model.Tag
let getTagInfo = async (ctx, next) => {
    const RowDataPacket = await Tag.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            adminInfo: Info
        }
    };
};

module.exports = {
    getTagInfo
}