const model = require("../models/Tag");

let Tag = model.Tag

/**
 * 获取所有标签
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
let getTagInfo = async (ctx, next) => {
    const RowDataPacket = await Tag.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: Info
    };
};

module.exports = {
    getTagInfo
}