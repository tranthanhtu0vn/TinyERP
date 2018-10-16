export class FileUpload {
    public name: string;
    public size: number;
    public mimeType: string;
    public content: string;
    public serverResponse: FileUploadResponse;
}

export class FileUploadResponse{
    public mediaId:string;
}