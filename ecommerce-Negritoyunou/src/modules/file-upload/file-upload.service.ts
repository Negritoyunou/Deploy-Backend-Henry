import { Injectable } from "@nestjs/common";
import { CloudinaryService } from "../Service/Cloudinary/cloudinary.service";
import { UploadFileDto } from "./dto/upload-file.dto";

@Injectable()
export class FileUploadService {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    async uploadFile(file: UploadFileDto){
        return this.cloudinaryService.uploadFile(file.buffer, file.originalname)
    }

    async getUrl(publicId: string){
        return this.cloudinaryService.getUrl(publicId)
    }
}
