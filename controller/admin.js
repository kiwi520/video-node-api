const model = require("../models/admin");

let Admin = model.Admin
let getAdminInfo = async (ctx, next) => {
    const RowDataPacket = await Admin.findAll(),
        Info = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            adminInfo: Info
        }
    };
};

module.exports = {
    getAdminInfo
}