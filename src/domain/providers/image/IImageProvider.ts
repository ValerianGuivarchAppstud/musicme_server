
export default interface IImageProvider {
    uploadPicture(content: Buffer): Promise<string>
}
