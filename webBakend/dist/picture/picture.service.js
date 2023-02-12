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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PictureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PictureService = class PictureService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPic(userId, pathName) {
        const thePics = await this.prisma.picture.findMany({
            where: {
                userId
            }
        });
        const theId = thePics.filter(pic => {
            if (pic.pathName === pathName) {
                return pic.id;
            }
        });
        if (theId) {
            return {
                theId: theId[0].id
            };
        }
        return {
            theId: "pic not found"
        };
    }
    async likePicture(userId, pict) {
        const likedPictures = await this.prisma.picture.findMany({
            where: {
                userId
            }
        });
        const already = likedPictures.filter(pic => {
            return pic.pathName === pict.pathName;
        });
        if (already.length === 0) {
            const picture = await this.prisma.picture.create({
                data: {
                    userId,
                    description: pict.descr,
                    place: pict.place,
                    pathName: pict.pathName,
                    animals: pict.animals
                }
            });
            return picture;
        }
        else {
            return this.deletePic(userId, already[0].id);
        }
    }
    async favoritePics(userId) {
        const pics = await this.prisma.picture.findMany({
            where: {
                userId,
            }
        });
        return { pics };
    }
    async deletePic(userId, id) {
        const thePic = await this.prisma.picture.findUnique({
            where: {
                id
            }
        });
        if (!thePic || thePic.userId !== userId)
            throw new common_1.ForbiddenException("Access denied");
        if (thePic && thePic.userId === userId) {
            await this.prisma.picture.delete({
                where: {
                    id
                }
            });
        }
        return this.favoritePics(userId);
    }
    async searchPic(searchkey) {
        const pics = await this.prisma.picture.findMany();
        console.log(pics);
        const key = searchkey.charAt(0).toUpperCase() + searchkey.slice(1);
        const searchPics = pics.filter(pic => {
            if (pic.place.includes(key) || pic.place.includes(searchkey)) {
                return pic;
            }
            else if (pic.animals && (pic.animals.includes(key) || pic.animals.includes(searchkey))) {
                console.log("from animal ", pic.place.includes(key), pic.animals.includes(key) ? pic.pathName : "");
                return pic;
            }
        });
        console.log(searchPics);
        const arrayUniqueByKey = [...new Map(searchPics.map(item => [item["pathName"], item])).values()];
        console.log(arrayUniqueByKey.length);
        return { searchPics: arrayUniqueByKey };
    }
};
PictureService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PictureService);
exports.PictureService = PictureService;
//# sourceMappingURL=picture.service.js.map