
export const mapStatus = (props)=>{
  if (props === 1) {
          return "Created";
    } else if (props === 2){
          return "Enabled";
    } else if (props === 3){
          return "Active";
    } else if (props === 4){
          return "Blocked";
    } else if (props === 5){
          return "Deleted";
    }
}