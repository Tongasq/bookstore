const delay = (ms:number) =>(
new Promise((resolve) => setTimeout(() => {
    resolve(null)}
,ms))
)

const API='http://localhost:5000'
export const fetchData = async (url:string,ms:number = 2000) => {
    try {
    const response = await fetch(`${API}/${url}`)
    if(ms) await delay(ms)
    const{status,ok} = response;
    if((!!ok)&&(status>=200)&&(status<300)) {
        return await response.json();
    } else {
        throw new Error(response.statusText);
    }
    }
    catch(err) {
    console.log(err)
    throw err
    }
}
