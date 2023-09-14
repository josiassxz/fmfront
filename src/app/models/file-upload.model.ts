export class FileUpload {
    constructor(
      public file: File = null,
      public description: string = null,
      //public fileBase64: string = null,
      public id: number = null,

    ) {
      //this.convertToBase64();
    }
  
    // convertToBase64() {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.file);
    //   reader.onload = (e: any) => (this.fileBase64 = e.target.result.replace(/^.*,/, ''));
    // }
  }