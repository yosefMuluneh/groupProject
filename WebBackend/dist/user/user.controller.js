"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const decorator_1 = require("../auth/decorator");
const PicDto_1 = require("../picture/PicDto");
const picture_service_1 = require("../picture/picture.service");
const prisma_service_1 = require("../prisma/prisma.service");
const user_update_dto_1 = require("./user-update-dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(picture, prisma, userService) {
        this.picture = picture;
        this.prisma = prisma;
        this.userService = userService;
    }
    update(id, userId, userUpdto) {
        console.log("updateng", userUpdto);
        return this.userService.updateUser(userId, userUpdto);
    }
    mySelf(id) {
        return this.userService.findMe(id);
    }
    likePicture(userId, pict) {
        return this.picture.likePicture(userId, pict);
    }
    sharePic() {
        return this.userService.sharePic();
    }
    favorite(userId) {
        return this.picture.favoritePics(userId);
    }
    getPicId(userId, pathName) {
        console.log({
            userId,
            pathName
        });
        return this.picture.getPic(userId, pathName);
    }
    deletePic(userId, picId) {
        return this.picture.deletePic(userId, picId);
    }
    searchUser(userId, email) {
        return this.userService.searchUser(email);
    }
};
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, user_update_dto_1.UserUpdateDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Get)("me"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "mySelf", null);
__decorate([
    (0, common_1.Post)('like'),
    __param(0, (0, decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, PicDto_1.PicDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "likePicture", null);
__decorate([
    (0, common_1.Get)("share"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sharePic", null);
__decorate([
    (0, common_1.Get)("/favorites"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "favorite", null);
__decorate([
    (0, common_1.Post)("getId"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Body)("pathName")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getPicId", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Param)("id", common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deletePic", null);
__decorate([
    (0, common_1.Post)("searchuser"),
    __param(0, (0, decorator_1.GetUser)("id")),
    __param(1, (0, common_1.Body)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "searchUser", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [picture_service_1.PictureService,
        prisma_service_1.PrismaService,
        user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map