export class CommonUtils {
    static  formatCurrentDate() {
        const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const date = new Date();
        
        const day = daysOfWeek[date.getDay()];
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
      
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        return `${day} ${hours}:${formattedMinutes} ${period}`;
      }
      static formatDate = (isoDate) => {
        const date = new Date(isoDate);
        console.log(date);
        // Get day abbreviation (e.g., SUN)
        const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        const dayAbbreviation = daysOfWeek[date.getUTCDay()];
      
        // Get formatted time (e.g., 16:28)
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
      
        return `${dayAbbreviation} ${formattedTime}`;
      };
}