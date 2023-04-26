const DayToWeek = ( date ) => {
    const parseDate = new Date(date);
    const dd = parseDate.getDate();
    const mm = parseDate.getMonth() + 1;

    switch (mm) {
        case 3:
          if(dd > 12 && dd <= 19) return 12;
          else if (dd > 19 && dd < 26) return 13;
          else if(dd > 26 || dd <= 2) return 14;
          break;
        case 4:
          if(dd <= 2) return 14;
          else if(dd > 2 && dd <= 9) return 15;
          else if(dd > 9 && dd <= 16) return 16;
          else if(dd > 16 && dd <= 23) return 17;
          break;
        default:
          console.log(`Date is not a valid`);
      }
      
};

export default DayToWeek;
