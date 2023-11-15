export const loadExternalSite = async (url:string) => {
  try {
    const response = await fetch(`api/web`,{method:'POST',body:JSON.stringify({url})});
    console.log(response)
    const data = await response.json();
    console.log(data)
    return data.siteContent;
  } catch (error) {
    console.log(error);
  }
};