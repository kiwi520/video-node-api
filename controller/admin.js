const model = require("../models/Admin");

let Admin = model.Admin
let getAdminInfo = async (ctx, next) => {
    const RowDataPacket = await Admin.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: Info
    };
};

module.exports = {
    getAdminInfo
}