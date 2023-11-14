export function generateIcon(extension:string){
  switch (extension) {
    case 'txt':
      return '/assets/icons/txt.png'
    case 'png':
      return '/assets/icons/image.png'
    case 'jpg':
      return '/assets/icons/image.png'
    case 'jpeg':
      return '/assets/icons/image.png'
    case 'gif':
      return '/assets/icons/image.png'
    default: '/assets/icons/file.png'
  }
}