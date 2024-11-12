
export const changeDateFormat = (inputString) => {

   let inputDate = new Date(inputString);
   function formatData(input){
        if(input < 10){
            return `0${input}`;
        }
        else{
            return input;
        }
    }
    let date = formatData(inputDate.getDate());
    let month = formatData(inputDate.getMonth() + 1);
    let year = inputDate.getFullYear();
    let hours = inputDate.getHours();
    let minutes = inputDate.getMinutes();

    return `${date}/${month}/${year} ${hours}:${minutes}`;
}