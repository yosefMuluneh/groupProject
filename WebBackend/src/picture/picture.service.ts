import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PicDto } from './PicDto';

@Injectable()
export class PictureService {
    constructor(private prisma:PrismaService){}

    // async allPictures(){
    //     const pictures = await this.prisma.picture.findMany
    // }

    async getPic(userId:number, pathName:string){
        const thePics = await this.prisma.picture.findMany({
            where:{
                userId
            }
        })

        const theId = thePics.filter(pic=>{
            if(pic.pathName === pathName){
                return pic.id
            }
        })

        if(theId){
            return {
                theId:theId[0].id
            }
        }
        return {
            theId:"pic not found"
        }
    }

    async likePicture(userId:number, pict:PicDto){
        const likedPictures = await this.prisma.picture.findMany({
            where:{
                userId
            }
        })

        const already = likedPictures.filter(pic=>{
            return pic.pathName === pict.pathName
        })

        if(already.length === 0){
            const picture  = await this.prisma.picture.create({
                data : {
                    userId,
                    description:pict.descr,
                    place:pict.place,
                    pathName:pict.pathName,
                    animals:pict.animals
                }
            })
            return picture
        }else{
            return this.deletePic(userId,already[0].id)
        }

    }


    async favoritePics(userId:number){
        const pics = await this.prisma.picture.findMany({
            where:{
                userId,
            }
        })
        return {pics}
    }

    async deletePic(userId:number,id:number){
        const thePic = await this.prisma.picture.findUnique({
            where:{
                id 
            }
        })

        if(!thePic || thePic.userId !== userId) throw new ForbiddenException("Access denied")

        if (thePic && thePic.userId === userId){
            await this.prisma.picture.delete({
                where:{
                    id
                }
            })
        }

       return this.favoritePics(userId)

    }

    async searchPic(searchkey:string){
        const pics = await this.prisma.picture.findMany()
        console.log(pics)
        const key = searchkey.charAt(0).toUpperCase() + searchkey.slice(1)
        const searchPics = pics.filter(pic=>{ 
            //console.log(key)
            if(pic.place.includes(key) || pic.place.includes(searchkey) ){
                return pic 
            }else if(pic.animals && (pic.animals.includes(key) || pic.animals.includes(searchkey))){
                console.log("from animal ",pic.place.includes(key),pic.animals.includes(key)?pic.pathName:"")
                return pic
            }
        })
        console.log(searchPics)
        const arrayUniqueByKey = [...new Map(searchPics.map(item =>
                [item["pathName"], item])).values()];
        console.log(arrayUniqueByKey.length)

        return {searchPics:arrayUniqueByKey}
    }

    
}
