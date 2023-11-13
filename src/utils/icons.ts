export function generateIcon(extension:string){
  switch (extension) {
    case 'txt':
      return '/assets/icons/txt.png'
    default: '/assets/icons/file.png'
  }
}