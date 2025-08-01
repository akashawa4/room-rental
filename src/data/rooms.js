import { roomTranslations } from './roomTranslations.js';

export const sampleRooms = [
  {
    id: 1,
    title: "Mulla's 1RK",
    rent: 2000,
    note: "without including light and water bill , 2/3 Students can stay in this 1RK.",
    contact: "+91 9890491855",
    address: "Salokhe Nagar, Kalamba",
    location: "50m away from College Gate",
    mapLink: "https://maps.app.goo.gl/iSpymFmgpNX7F22X7?g_st=aw",
    gender: "boy", // Available for boys
    roomType: "1 RK",
    rooms: "1 RK & 1RK",
    images: [
      "/Ayan Mulla/mulla 0_converted_converted.avif",
      "/Ayan Mulla/mulla 1_converted.avif",
      "/Ayan Mulla/mulla 2_converted.avif",
      "/Ayan Mulla/mulla 3_converted.avif",
      "/Ayan Mulla/mulla 4_converted.avif",
      "/Ayan Mulla/mulla 5_converted.avif",
      "/Ayan Mulla/mulla 6_converted.avif",
      "/Ayan Mulla/mulla 7_converted.avif",
      "/Ayan Mulla/mulla 8_converted.avif",
      "/Ayan Mulla/mulla 9_converted.avif",
      "/Ayan Mulla/mulla 10_converted.avif",
      "/Ayan Mulla/mulla 11_converted.avif"
    ],
    description: "5000 Rs. Advance , Gas Geyser Cylinder Should Refill by students ,The rent should be paid between the 1st and 10th of each month ,Student Addhar card , photo and paraent phone number is mandatory , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , ",
    features: ["GAS GEYSER", "WIFI", "WATER SUPPLY", "Charging Bulb for electricity issue", "PARKING" , "Study Table for Students","3 CHAIRS FOR STUDENTS" , "MESS IN NEIGHBOUR HOUSE" , "TERRACE ACCESS" ]
  },
  {
    id: 2,
    title: "Sangita Gavde's Single Room",
    rent: 1500,
    note: "without including light and water bill",
    contact: "+91 7219637257",
    address: "879/53, More Mane Nagar, Shivganga Colony, Kolhapur, Maharashtra 416011",
    location: "50m away from DYPSN College Gate , Behind Canteen Mess ",
    mapLink: "https://goo.gl/maps/9FvULyBjMRWmYziG8?g_st=aw",
    gender: "boy", // Available for boys
    roomType: "Single Room",
    rooms: "Single Room",
    images: [
      "/Sabgita Gavde/S Gavde 0_converted_converted.avif",
      "/Sabgita Gavde/S Gavde 1_converted.avif",
      "/Sabgita Gavde/S Gavde 2_converted.avif",
      "/Sabgita Gavde/S Gavde 3_converted.avif"
    ],
    description: "2 Boys can stay in this room, 1 YEAR AGREEMENT ,1000 Rs. Deposite ,After 11pm no entry , Friends are not allowed in room .",
    features: ["WIFI", "WATER SUPPLY", "fOR LIGHT BILL SEPRATE METER", "PARKING", "GAS GEYSER"]
  },
  {
    id: 3,
    title: "Dipali Teli's 1RK",
    rent: 2000 ,
    note: " Rent including light and water bill,2/3 girls can stay in this room.",
    contact: "+91 7568183951",
    address: "Survey Nagar ,Klamaba.",
    location: "150m away from DYPSN College Gate, Infront of Mug Kirana Shop ,",
    mapLink: "https://maps.app.goo.gl/wwbd9bpKvDYmuowo6?g_st=aw",
    gender: "girl", // Available for girls
    roomType: "1 RK",
    rooms: "1 RK",
    images: [
      "/Dipali Teli/Teli 0_converted_converted.avif",
      "/Dipali Teli/Teli 1_converted.avif",
      "/Dipali Teli/Teli 2_converted.avif",
      "/Dipali Teli/Teli 3_converted.avif",
      "/Dipali Teli/Teli 4_converted.avif",
      "/Dipali Teli/Teli 5_converted.avif",
      "/Dipali Teli/Teli 6_converted.avif",
      "/Dipali Teli/Teli 7_converted.avif"
    ],
    description: "After 09:30 pm  no entry , Only Praents Allowed in room except brother , addhar card and photo of student  is mandatory ",
    features: ["PARKING", "WATER SUPPLY", "SELF COOKING  ALLOW", "OWNER HAVE MESS", "TERRACE ACCESS"]
  },
  {
    id: 4,
    title: "Trimurti House",
    rent: 1700,
    note: "Including light and water bill , 1 girl can stay in this room.",
    contact: "+91 8999181429",
    address: " More Mane Nagar , Kalamba",
    location: "300m away from DYPSN College Gate, Girls PG Area",
    mapLink: "https://goo.gl/maps/pc8vTXNy433X5CVq6?g_st=aw",
    gender: "girl", // Available for girls
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Trimurti House/house 0_converted.avif",
      "/Trimurti House/house 1_converted.avif",
      "/Trimurti House/house 2_converted.avif",
      "/Trimurti House/house 3_converted.avif",
      "/Trimurti House/house 4_converted.avif",
      "/Trimurti House/house 5_converted.avif",
      "/Trimurti House/house 6_converted.avif"
    ],
    description: "After 10pm no entry , Self cooking not allowed , 1700 Rs. Advance , addhar car and student photo is mandatory ",
    features: ["WIFI", "GEYSER", "WATER SUPPLY", "CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS" , "PARKING" , "AQUA FILTRE"]
  },
  {
    id: 5,
    title: "SHREE SWAMI SAMARTH GIRLS HOSTEL",
    rent: 2000,
    note: "Including light and water bill , 1 girl is needed can stay in this room.",
    contact: "+91 9975867802",
    address: "MORE MANE NAGAR KALAMBA ",
    location: "320m away from DYPSN College Gate, Girls PG Area",
    mapLink: "https://maps.app.goo.gl/Ydgb2vWPs4hGAUfa8?g_st=aw",
    gender: "girl", // Available for girls
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/more sir girls hostel/hostel 0.avif",
      "/more sir girls hostel/hostel 1.avif",
      "/more sir girls hostel/hostel 2_converted.avif",
      "/more sir girls hostel/hostel 3_converted.avif",
      "/more sir girls hostel/hostel 4_converted.avif",
      "/more sir girls hostel/hostel 5_converted.avif",
      "/more sir girls hostel/hostel 6_converted.avif",
      "/more sir girls hostel/hostel 7_converted.avif",
      "/more sir girls hostel/hostel 8_converted.avif",
      "/more sir girls hostel/hostel 9_converted.avif",
      
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry(Entry gate locked) , Self cooking not allowed , 2000 Rs. Advance , addhar car and student photo is mandatory ",
    features: ["3 Floor buliding","WIFI", "GEYSER", "WATER SUPPLY", "Cloth Drying Area", "TERRACE ACCESS" , "PARKING" , "CCTV CAMERA" , "SECURITY" , "BEDS" , "CUBERT", "LADY DOCTOR SUPPORT", "shoes stand" , "Grbage Mnagement by owner", "Parents allowed for stay", "Solar Panel"]
  },
  {
    id: 6,
    title: "RUPALI NIKAM'S 1RK",
    rent: 2000,
    note: "Including light and water bill , 4/5 GIRLS can stay in this room.",
    contact: "+91 8855883164",
    address: "MORE MANE NAGAR ,Klamaba.",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.google.com/?q=987+Budget+Street+Student+Area",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Rupali Nikam/Rupali 0_converted.avif", 
      "/Rupali Nikam/Rupali 1_converted.avif",
      "/Rupali Nikam/Rupali 2_converted.avif",
      "/Rupali Nikam/Rupali 3_converted.avif",
      "/Rupali Nikam/Rupali 4_converted.avif",
      "/Rupali Nikam/Rupali 5_converted.avif",
    
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI","Hot Water","PARKING", "WATER SUPPLY","Cubert","Basic furniture", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 7,
    title: "Swati Naik's House",
    rent: 1500,
    note: "Including light and water bill .",
    contact: "+91 9922113453",
    address: "More Mane Nagar , Kalamba",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/iwbvTqrh6DGkvww76?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 RK , 1RK & 1 Hall",
    images: [
      "/Swati Naik/swati 0_converted.avif",
      "/Swati Naik/swati 1_converted.avif",
      "/Swati Naik/swati 2_converted.avif",
      "/Swati Naik/swati 3_converted.avif",
      "/Swati Naik/swati 4_converted.avif",
      "/Swati Naik/swati 5_converted.avif",
      "/Swati Naik/swati 6_converted.avif",
      "/Swati Naik/swati 7_converted.avif",
      "/Swati Naik/swati 8_converted.avif",
      "/Swati Naik/swati 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 8,
    title: "Vimal Ashok Patil's 1RK",
    rent: 2000,
    note: "Including light and water bill , 4/3 boys can stay in this room.",
    contact: "+91 8421150854",
    address: "Kalamba",
    location: "600m away from DYPSN College Gate, Near Karvir Chicken Shop , Kalamba.",
    mapLink: "https://maps.app.goo.gl/bYt8aXNyASz1KWhW7?g_st=aw",
    gender: "boy", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Vimal Patil/Vimal 0_converted.avif",
      "/Vimal Patil/Vimal 1_converted.avif",
      "/Vimal Patil/Vimal 2_converted.avif",
      "/Vimal Patil/Vimal 3_converted.avif",
      "/Vimal Patil/Vimal 4_converted.avif",
      "/Vimal Patil/Vimal 5_converted.avif",
      "/Vimal Patil/Vimal 6_converted.avif",
      "/Vimal Patil/Vimal 7_converted.avif",
      "/Vimal Patil/Vimal 8_converted.avif",
      "/Vimal Patil/Vimal 9_converted.avif",
    ],
    description: "2000 Rs. Advance , 1 YEAR AGREEMENT ,The rent should be paid between the 1st and 10th of each month, Self Cleaning , After 10pm no entry  , addhar card and student photo and parent phone number is mandatory ",
    features: ["Beds", "Mattress", "Water Supply", "Dressing Table", "Water Supply", "Self Cooking allowed", "Parking" , "Shoes stand","cloth Drying Space ", "Charging Bulb for electricity issue" , "Water Jar Provided for Drinking Water", "Market Accessible"] 
  },
  {
    id: 9,
    title: "SARIKA LAXMAN KOPARDEKAR'S 1RK",
    rent: 2000,
    note: "Including light and water bill , 5 GIRLS can stay in this room.",
    contact: "+91 9763539136",
    address: "More Mane Nagar , Kalamba",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/iwbvTqrh6DGkvww76?g_st=aw",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 0_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 1_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 2_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 3_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 4_converted.avif",
      "/SARIKA LAXMUNKOPARDEKA'S/sarika 5_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 10,
    title: "Arjun Patil's House",
    rent: 2000,
    note: "Including light and water bill.",
    contact: "+91 9975099944",
    address: "Salokhenagar , Kalamba",
    location: "72m away from DYPSN College Gate, Behind Gavli Mess.",
    mapLink: "https://maps.app.goo.gl/BSaCPfDSAueXuXYQ7?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 RK, 1RK & 1 Hall",
    images: [
      "/Arjun Patil/Arjun 0_converted.avif",
      "/Arjun Patil/Arjun 1_converted.avif",
      "/Arjun Patil/Arjun 2_converted.avif",
      "/Arjun Patil/Arjun 3_converted.avif",
      "/Arjun Patil/Arjun 4_converted.avif",
      "/Arjun Patil/Arjun 5_converted.avif",
      "/Arjun Patil/Arjun 6_converted.avif",
      "/Arjun Patil/Arjun 7_converted.avif",
      "/Arjun Patil/Arjun 8_converted.avif",
      "/Arjun Patil/Arjun 9_converted.avif",
      "/Arjun Patil/Arjun 10_converted.avif",
      "/Arjun Patil/Arjun 11_converted.avif",
      "/Arjun Patil/Arjun 12_converted.avif",
    
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,If some damage happen in room by Student then they have to pay for that , 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Self Cooking not allowed.",
    features: ["WIFI", "WATER SUPPLY", "NEAR BY MESS", "TERRACE ACCESS",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 11,
    title: "SURYAKANT SANGPAL HOUSE",
    rent: 2000,
    note: "Including light and water bill , 4 Girls per room and 12 GIRLS can stay in this 3 FLOOR HOUSE.",
    contact: "+91 9975098773",
    address: "Salokhenagar , Kalamba",
    location: "100m away from DYPSN College Gate, Behind Gavli Mess.",
    mapLink: "https://goo.gl/maps/4Xn1fdBChd95sgpz6?g_st=aw",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Suuryakant Sapkal/sangpal 0_converted.avif",
      "/Suuryakant Sapkal/sangpal 1_converted.avif",
      "/Suuryakant Sapkal/sangpal 2_converted.avif",
      "/Suuryakant Sapkal/sangpal 3_converted.avif",
      "/Suuryakant Sapkal/sangpal 4_converted.avif",
      "/Suuryakant Sapkal/sangpal 5_converted.avif",
      "/Suuryakant Sapkal/sangpal 6_converted.avif",
      "/Suuryakant Sapkal/sangpal 7_converted.avif",
      "/Suuryakant Sapkal/sangpal 8_converted.avif",
      "/Suuryakant Sapkal/sangpal 9_converted.avif",
      "/Suuryakant Sapkal/sangpal 10_converted.avif",
      "/Suuryakant Sapkal/sangpal 11_converted.avif",
      "/Suuryakant Sapkal/sangpal 12_converted.avif",
      "/Suuryakant Sapkal/sangpal 13_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,If some damage happen in room by Student then they have to pay for that , 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning , After 10pm no entry , Friends are not allowed in room  .",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS",  "PARKING" , "Parets allowed for stay only one day"]
  },
  {
    id: 12,
    title: "SWAMI SAMARTH HOUSE (ROHIT RANJIT BENDARE)",
    rent: 1800,
    note: "Including light and water bill , 8 GIRLS can stay in this room.",
    contact: "+91 8855903406",
    address: "Salokhenagar , Kalamba",
    location: "100m away from DYPSN College Gate, .",
    mapLink: "https://maps.app.goo.gl/9EZtgicry5Wd4zyt7?g_st=aw",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Rohit Bendare/rohit 0_converted.avif",
      "/Rohit Bendare/rohit 1_converted.avif",
      "/Rohit Bendare/rohit 2_converted.avif",
      "/Rohit Bendare/rohit 3_converted.avif",
      "/Rohit Bendare/rohit 4_converted.avif",
      "/Rohit Bendare/rohit 5_converted.avif",
      "/Rohit Bendare/rohit 6_converted.avif",
      "/Rohit Bendare/rohit 7_converted.avif",
      "/Rohit Bendare/rohit 8_converted.avif",``
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry.",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "OWNER'S MESS", "NEAR BY MESS", "TERRACE ACCESS", "PARKING",  "BEDS" , "Mattress","Parets allowed for stay", "Charging Bulb for ELECTRICITY issue"]
  },
  {
    id: 13,
    title: "DIPAK CHOUGALE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 5 GIRLS can stay in this room.",
    contact: "+91 9930407171",
    address: "Salokhenagar , Kalamba",
    location: "100m away from DYPSN College Gate, Near Arjun Patil's House.",
    mapLink: "https://maps.app.goo.gl/DXAs81tDtrg1B4Nw5?g_st=aw",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
     "/Dipak Chougale/front_converted.avif",     
      "/Dipak Chougale/chougale 0_converted.avif",
      "/Dipak Chougale/chougale 1_converted.avif",
      "/Dipak Chougale/chougale 2_converted.avif",
      "/Dipak Chougale/chougale 3_converted.avif",
      "/Dipak Chougale/chougale 4_converted.avif",
      "/Dipak Chougale/chougale 5_converted.avif",
      "/Dipak Chougale/chougale 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory ,Only Laptop and Mobile Charging is allowed , Hairdryer and other electronics is not allowed , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Self Cooking not allowed.",
    features: ["WIFI", "WATER SUPPLY", "NEAR BY MESS", "TERRACE ACCESS",  "BEDS", "shoes stand" , "Parets allowed for stay" , "Charging Bulb for ELECTRICITY issue","Self cooking allowed", "dedicated space for washing cloth","Stairs with Auto Light Sensor"]
  },
  {
    id: 14,
    title: "BADAM SALOKHE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 4 GIRLS can stay in this room.",
    contact: "+91 9822673489",
    address: "Salokhenagar , Kalamba",
    location: "100m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/3M5fqmDY7AAWcDA6A?g_st=aw",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Badam Salokhe/1bhk/badam_converted (1).avif",
      "/Badam Salokhe/1bhk/Badam 0_converted.avif",
      "/Badam Salokhe/1bhk/Badam 1_converted.avif",
      "/Badam Salokhe/1bhk/Badam 2_converted.avif",
      "/Badam Salokhe/1bhk/Badam 3_converted.avif",
      "/Badam Salokhe/1bhk/Badam 4_converted.avif",
      "/Badam Salokhe/1bhk/Badam 5_converted.avif",
      "/Badam Salokhe/1bhk/Badam 6_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , If there are three student in room then the electricity and water bill will be paid by students",
    features: ["WIFI(If Student want they can have it by their own)","HOT WATER", "WATER SUPPLY","Parking", "SELF COOKING ALLOW", "NEAR BY MESS","CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"]
  },
  {
    id: 15,
    title: "BADAM SALOKHE'S HOUSE",
    rent: 2000,
    note: "Including light and water bill , 4 boys can stay in this room.",
    contact: "+91 9822673489",
    address: "Salokhenagar , Kalamba",
    location: "100m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "hhttps://maps.app.goo.gl/8Xs7bWKifv9cf6vo8?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Badam Salokhe/cot basis/badam_converted.avif",
      "/Badam Salokhe/cot basis/cot 0_converted.avif",
      "/Badam Salokhe/cot basis/cot 1_converted.avif",
      "/Badam Salokhe/cot basis/cot 2_converted.avif",
      "/Badam Salokhe/cot basis/cot 3_converted.avif",
      "/Badam Salokhe/cot basis/cot 4_converted.avif",
      "/Badam Salokhe/cot basis/cot 5_converted.avif",
      "/Badam Salokhe/cot basis/cot 6_converted.avif",
      "/Badam Salokhe/cot basis/cot 7_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance , No drinking and smoking allowed in room, STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , Good Behaviour is required",
    features: ["WIFI","HOT WATER", "WATER SUPPLY","Parking", "Beds","Mattress", "NEAR BY MESS","CHARGING BULB FOR ELECTRICITY ISSUE", "TERRACE ACCESS", "PARKING", "Parets allowed for stay"]
  },
  {
    id: 16,
    title: "KIRAN KARAGJAR'S HOUSE",
    rent: 1800,
    note: "Including light and water bill , 3 Boys needed to  stay in this room.",
    contact: "+91 9890489797",
    address: "Salokhenagar , Kalamba",
    location: "90m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/3foeiBa4Vc4Jx8C77?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 RK",
    images: [
      "/Kiran Karagjar/kiran 0_converted.avif",
      "/Kiran Karagjar/kiran 1_converted.avif",
      "/Kiran Karagjar/kiran 2_converted.avif",
      "/Kiran Karagjar/kiran 3_converted.avif",
      "/Kiran Karagjar/kiran 4_converted.avif",
      "/Kiran Karagjar/kiran 5_converted.avif",
      "/Kiran Karagjar/kiran 6_converted.avif",
      "/Kiran Karagjar/kiran 7_converted.avif",
      "/Kiran Karagjar/kiran 8_converted.avif",
      "/Kiran Karagjar/kiran 9_converted.avif",
      "/Kiran Karagjar/kiran 10_converted.avif",

    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room  , Self Cleaning , If there are three student in room then the electricity and water bill will be paid by students",
    features: ["WIFI(If Student want they can have it by their own)","HOT WATER", "WATER SUPPLY","Parking", "SELF COOKING ALLOW", "NEAR BY MESS","CHARGING BULB FOR ELECTRICITY ISSUE", "Electric Induction for Cooking","Beds","Mattress","TERRACE ACCESS", "PARKING", "Parets allowed for stay","Near by mess"]
  },
  {
    id: 17,
    title: "SANJAY GANAPATI JADHAV'S HOUSE",
    rent: 1600,
    note: "Including light and water bill , 9 BOYS can stay in this room.",
    contact: "+91 9423275126",
    address: "Kalamba Lake , Kalamba",
    location: "1.5km away from DYPSN College Gate, Near Kalamba Lake Waterfall.",
    mapLink: "https://goo.gl/maps/s1Ew2DPs6TYyER449?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "2 BHK",
    images: [
      "/Sanjay Ganpati Jadhav/Sanjay 0_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 1_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 2_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 3_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 4_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 5_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 6_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 7_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 8_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 9_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 10_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 11_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 12_converted.avif",
      "/Sanjay Ganpati Jadhav/Sanjay 13_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 25th and 5th of each month ,After 10pm no entry, 3000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Good Behaviour is required,  Group Studies are not allowed, Self Cleaning is required, After 10pm no entry, Friends are not allowed in room  , Self Cleaning .",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "Hot Water","NEAR BY MESS", "TERRACE ACCESS", "PARKING" , "Parets allowed for stay", "20m away Kalamba Waterfall"]
  },
  {
    id: 18,
    title: "PANKAJ WAGHMARE'S HOUSE",
    rent: 1600,
    note: "Including light and water bill , 7 BOYS can stay in this room.",
    contact: "+91 9822264124",
    address: "Kalamba Lake , Kalamba",
    location: "1.5km away from DYPSN College Gate, Near Kalamba Lake Waterfall.",
    mapLink: "https://goo.gl/maps/s1Ew2DPs6TYyER449?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Pankaj Waghmare/pankaj 0_converted.avif",
      "/Pankaj Waghmare/pankaj 1_converted.avif",
      "/Pankaj Waghmare/pankaj 2_converted.avif",
      "/Pankaj Waghmare/pankaj 3_converted.avif",
      "/Pankaj Waghmare/pankaj 4_converted.avif",
      "/Pankaj Waghmare/pankaj 5_converted.avif",
      "/Pankaj Waghmare/pankaj 6_converted.avif",
      "/Pankaj Waghmare/pankaj 7_converted.avif",
      "/Pankaj Waghmare/pankaj 8_converted.avif",
      "/Pankaj Waghmare/pankaj 9_converted.avif",
      "/Pankaj Waghmare/pankaj 10_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 19,
    title: "SUREKHA GAVLI'S HOUSE(GAVLI MESS)",
    rent: 2000,
    note: "Including light and water bill , 6 Boys can stay in this room.",
    contact: "+91 7057831999",
    address: "Salokhenagar , Kalamba",
    location: "60m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/4NxWJ6PUYktSKdjC6?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "Single Room",
    images: [
      "/Surekha Gavli/gavli 0_converted.avif",
      "/Surekha Gavli/gavli 1_converted.avif",
      "/Surekha Gavli/gavli 2_converted.avif",
      "/Surekha Gavli/gavli 3_converted.avif",
      "/Surekha Gavli/gavli 4_converted.avif",
      "/Surekha Gavli/gavli 5_converted.avif",
      "/Surekha Gavli/gavli 6_converted.avif",
      "/Surekha Gavli/gavli 7_converted.avif",
      "/Surekha Gavli/gavli 8_converted.avif",
      "/Surekha Gavli/gavli 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory, Self Cleaning is required, After 10pm no entry, Friends are not allowed in room  , Self Cleaning , Good Behaviour is required",
    features: ["WIFI", "CHARGING BULB FOR ELECTRICITY ISSUE", "New Rooms", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING" , "Parets allowed for stay","Owner's Mess"]
  },
  {
    id: 20,
    title: "Abhiya Parkar's House",
    rent: 2000,
    note: "Including light and water bill , 4 Boys can stay in this room.",
    contact: "+91 9420258442",
    address: "Survey Nagar , Kalamba",
    location: "900m away from DYPSN College Gate.",
    mapLink: "https://maps.app.goo.gl/zFmaM4EvcrAHpNg1A?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Abhiya Parkar/parkar 0_converted.avif",
      "/Abhiya Parkar/parkar 1_converted.avif",
      "/Abhiya Parkar/parkar 2_converted.avif",
      "/Abhiya Parkar/parkar 3_converted.avif",
      "/Abhiya Parkar/parkar 4_converted.avif",
      "/Abhiya Parkar/parkar 5_converted.avif",
      "/Abhiya Parkar/parkar 6_converted.avif",
      "/Abhiya Parkar/parkar 7_converted.avif",
      "/Abhiya Parkar/parkar 8_converted.avif",
      "/Abhiya Parkar/parkar 9_converted.avif",
      "/Abhiya Parkar/parkar 10_converted.avif",
      "/Abhiya Parkar/parkar 11_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 5000 Rs. Advance , No drinking and smoking allowed in room, STUDENTS'S addhar card, photo and parent phone number is mandatory , Self Cleaning , After 10pm no entry , Friends are not allowed in room , Grabage Management by students, Self Cleaning , Good Behaviour is required",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS" , "Parets allowed for stay"]
  },
  {
    id: 21,
    title: "Matoshree House",
    rent: 2000,
    note: "Including light and water bill , 6 GIRLS can stay in this room.",
    contact: "+91 9028083205",
    address: "More Mane Nagar , Kalamba",
    location: "300m away from DYPSN College Gate, Near Trimurti House.",
    mapLink: "https://maps.app.goo.gl/oxd6jxXUy5jqKwS48",
    gender: "girls", // Available for girls
    roomType: "Cot Basis",
    rooms: "1 BHK",
    images: [
      "/Matoshree House/shree 0_converted.avif",
      "/Matoshree House/shree 1_converted.avif",
      "/Matoshree House/shree 2_converted.avif",
      "/Matoshree House/shree 3_converted.avif",
      "/Matoshree House/shree 4_converted.avif",
      "/Matoshree House/shree 5_converted.avif",
      "/Matoshree House/shree 6_converted.avif",
      "/Matoshree House/shree 7_converted.avif",
      "/Matoshree House/shree 8_converted.avif",
      "/Matoshree House/shree 9_converted.avif",
      "/Matoshree House/shree 10_converted.avif",
      "/Matoshree House/shree 11_converted.avif",
      "/Matoshree House/shree 12_converted.avif",
      "/Matoshree House/shree 13_converted.avif",
      "/Matoshree House/shree 14_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 5th of each month ,After 10pm no entry, 2000 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory,  Friends are not allowed in room  , Self Cleaning , Good Behaviour is required , Grabage Management by students",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  {
    id: 22,
    title: "Vaibhav Patil's House",
    rent: 1800,
    note: "Including light and water bill , 3 Boys can stay in this room.",
    contact: "+91 7020287835",
    address: "Survey Nagar , Kalamba",
    location: "110m away from DYPSN College Gate.Near Vimal Hospital",
    mapLink: "https://maps.app.goo.gl/XeZT5qhenUaJhVaD8?g_st=aw",
    gender: "boys", // Available for boys
    roomType: "Cot Basis",
    rooms:"Single Room",
    images: [
      "/Vaibhav Anandrav Patil/patil 0_converted.avif",
      "/Vaibhav Anandrav Patil/patil 1_converted.avif",
      "/Vaibhav Anandrav Patil/patil 2_converted.avif",
      "/Vaibhav Anandrav Patil/patil 3_converted.avif",
      "/Vaibhav Anandrav Patil/patil 4_converted.avif",
      "/Vaibhav Anandrav Patil/patil 5_converted.avif",
      "/Vaibhav Anandrav Patil/patil 6_converted.avif",
      "/Vaibhav Anandrav Patil/patil 7_converted.avif",
      "/Vaibhav Anandrav Patil/patil 8_converted.avif",
      "/Vaibhav Anandrav Patil/patil 9_converted.avif",
    ],
    description: "1 YEAR AGREEMENT , The rent should be paid between the 1st and 10th of each month ,After 10pm no entry, 1500 Rs. Advance ,  STUDENTS'S addhar card, photo and parent phone number is mandatory. ",
    features: ["WIFI(If Student want they can have it by their own)", "WATER SUPPLY", "SELF COOKING ALLOW", "NEAR BY MESS", "TERRACE ACCESS", "STUDY TABLE FOR STUDENTS", "PARKING",  "BEDS", "shoes stand" , "Parets allowed for stay"]
  },
  
  

  
];

// Function to get translated room data
export const getTranslatedRooms = (language = 'en') => {
  const t = (key) => roomTranslations[language]?.[key] || roomTranslations.en[key] || key;
  
  return sampleRooms.map(room => ({
    ...room,
    title: translateRoomTitle(room.title, t),
    note: translateRoomNote(room.note, t),
    description: translateRoomDescription(room.description, t),
    address: translateAddress(room.address, t),
    location: translateLocation(room.location, t),
    features: room.features.map(feature => translateFeature(feature, t)),
    roomType: translateRoomType(room.roomType, t),
    rooms: translateRoomType(room.rooms, t)
  }));
};

// Helper functions for translation
const translateRoomTitle = (title, t) => {
  if (!title) return title;
  
  let translatedTitle = title;
  
  // Translate common patterns in titles
  translatedTitle = translatedTitle.replace(/1RK/g, t('oneRK'));
  translatedTitle = translatedTitle.replace(/Single Room/g, t('singleRoom'));
  translatedTitle = translatedTitle.replace(/House/g, t('house'));
  translatedTitle = translatedTitle.replace(/Hostel/g, t('hostel'));
  
  // Translate owner names (keep apostrophe but translate the name)
  translatedTitle = translatedTitle.replace(/Mulla's/g, t('mullas'));
  translatedTitle = translatedTitle.replace(/Sangita Gavde's/g, t('sangitaGavdes'));
  translatedTitle = translatedTitle.replace(/Dipali Teli's/g, t('dipaliTelis'));
  translatedTitle = translatedTitle.replace(/Swati Naik's/g, t('swatiNaiks'));
  translatedTitle = translatedTitle.replace(/Vimal Ashok Patil's/g, t('vimalAshokPatils'));
  translatedTitle = translatedTitle.replace(/Arjun Patil's/g, t('arjunPatils'));
  translatedTitle = translatedTitle.replace(/SARIKA LAXMAN KOPARDEKAR'S/g, t('sarikaLaxmanKopardekars'));
  translatedTitle = translatedTitle.replace(/RUPALI NIKAM'S/g, t('rupaliNikams'));
  translatedTitle = translatedTitle.replace(/SHREE SWAMI SAMARTH GIRLS HOSTEL/g, t('shreeSwamiSamarthGirlsHostel'));
  translatedTitle = translatedTitle.replace(/RUPALI NIKAM'S/g, t('rupaliNikams'));
  
  return translatedTitle;
};

const translateAddress = (address, t) => {
  if (!address) return address;
  
  let translatedAddress = address;
  
  // Translate common address patterns
  translatedAddress = translatedAddress.replace(/Salokhe Nagar/g, t('salokheNagar'));
  translatedAddress = translatedAddress.replace(/Kalamba/g, t('kalamba'));
  translatedAddress = translatedAddress.replace(/More Mane Nagar/g, t('moreManeNagar'));
  translatedAddress = translatedAddress.replace(/Shivganga Colony/g, t('shivgangaColony'));
  translatedAddress = translatedAddress.replace(/Kolhapur/g, t('kolhapur'));
  translatedAddress = translatedAddress.replace(/Maharashtra/g, t('maharashtra'));
  translatedAddress = translatedAddress.replace(/Survey Nagar/g, t('surveyNagar'));
  translatedAddress = translatedAddress.replace(/Klamaba/g, t('kalamba'));
  
  return translatedAddress;
};

const translateLocation = (location, t) => {
  if (!location) return location;
  
  let translatedLocation = location;
  
  // Translate distance measurements
  translatedLocation = translatedLocation.replace(/50m/g, t('fiftyMeters'));
  translatedLocation = translatedLocation.replace(/150m/g, t('hundredFiftyMeters'));
  translatedLocation = translatedLocation.replace(/300m/g, t('threeHundredMeters'));
  translatedLocation = translatedLocation.replace(/320m/g, t('threeHundredTwentyMeters'));
  translatedLocation = translatedLocation.replace(/600m/g, t('sixHundredMeters'));
  translatedLocation = translatedLocation.replace(/72m/g, t('seventyTwoMeters'));
  
  // Translate common location patterns
  translatedLocation = translatedLocation.replace(/away from College Gate/g, t('awayFromCollegeGate'));
  translatedLocation = translatedLocation.replace(/away from DYPSN College Gate/g, t('awayFromDYPSNCollegeGate'));
  translatedLocation = translatedLocation.replace(/Behind Canteen Mess/g, t('behindCanteenMess'));
  translatedLocation = translatedLocation.replace(/Infront of Mug Kirana Shop/g, t('infrontOfMugKirana'));
  translatedLocation = translatedLocation.replace(/Girls PG Area/g, t('girlsPGArea'));
  translatedLocation = translatedLocation.replace(/Near Trimurti House/g, t('nearTrimurtiHouse'));
  translatedLocation = translatedLocation.replace(/Near Karvir Chicken Shop/g, t('nearKarvirChicken'));
  translatedLocation = translatedLocation.replace(/Behind Gavli Mess/g, t('behindGavliMess'));
  
  return translatedLocation;
};

const translateRoomNote = (note, t) => {
  if (!note) return note;
  
  let translatedNote = note;
  
  // Translate common phrases
  translatedNote = translatedNote.replace(/without including light and water bill/g, t('withoutIncludingLightWater'));
  translatedNote = translatedNote.replace(/Including light and water bill/g, t('includingLightWater'));
  translatedNote = translatedNote.replace(/2\/3 Students can stay in this 1RK\./g, `2/3 ${t('studentsCanStay')} 1RK.`);
  translatedNote = translatedNote.replace(/2 Boys can stay in this room/g, `2 ${t('boysCanStay')}`);
  translatedNote = translatedNote.replace(/2\/3 girls can stay in this room\./g, `2/3 ${t('girlsCanStay')}`);
  translatedNote = translatedNote.replace(/1 girl can stay in this room\./g, `1 ${t('girlCanStay')}`);
  translatedNote = translatedNote.replace(/4\/5 GIRLS can stay in this room\./g, `4/5 ${t('girlsCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/3 boys can stay in this room\./g, `4/3 ${t('boysCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/5 boys can stay in this room\./g, `4/5 ${t('boysCanStayPlural')}`);
  translatedNote = translatedNote.replace(/5 GIRLS can stay in this room\./g, `5 ${t('girlsCanStayPlural')}`);
  translatedNote = translatedNote.replace(/4\/5 GIRLS can stay in this room\./g, `4/5 ${t('girlsCanStayPlural')}`);
  
  return translatedNote;
};

const translateRoomDescription = (description, t) => {
  if (!description) return description;
  
  let translatedDescription = description;
  
  // Translate common phrases in descriptions
  translatedDescription = translatedDescription.replace(/5000 Rs\. Advance/g, `5000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1000 Rs\. Deposite/g, `1000 ${t('depositRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1700 Rs\. Advance/g, `1700 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/3000 Rs\. Advance/g, `3000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1500 Rs\. Advance/g, `1500 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/2000 Rs\. Advance/g, `2000 ${t('advanceRequiredRs')}`);
  translatedDescription = translatedDescription.replace(/1 YEAR AGREEMENT/g, t('yearAgreement'));
  translatedDescription = translatedDescription.replace(/The rent should be paid between the 1st and 10th of each month/g, t('rentPaymentBetween1st10th'));
  translatedDescription = translatedDescription.replace(/After 10pm no entry/g, t('after10pmNoEntry'));
  translatedDescription = translatedDescription.replace(/After 11pm no entry/g, t('after11pmNoEntry'));
  translatedDescription = translatedDescription.replace(/After 09:30 pm no entry/g, t('after930pmNoEntry'));
  translatedDescription = translatedDescription.replace(/Friends are not allowed in room/g, t('friendsNotAllowedInRoom'));
  translatedDescription = translatedDescription.replace(/Only Praents Allowed in room except brother/g, t('onlyParentsAllowed'));
  translatedDescription = translatedDescription.replace(/addhar card and photo of student is mandatory/g, t('aadharCardPhoto'));
  translatedDescription = translatedDescription.replace(/addhar car and student photo is mandatory/g, t('aadharCardPhoto'));
  translatedDescription = translatedDescription.replace(/STUDENTS'S addhar card, photo and parent phone number is mandatory\./g, t('studentAadharPhotoParentMandatory'));
  translatedDescription = translatedDescription.replace(/addhar card and student photo and parent phone number is mandatory/g, t('aadharCardPhotoParentMandatory'));
  translatedDescription = translatedDescription.replace(/Self Cleaning/g, t('selfCleaning'));
  translatedDescription = translatedDescription.replace(/Self cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/If some damage happen in room by Student then they have to pay for that/g, t('damagePaymentNote'));
  translatedDescription = translatedDescription.replace(/Entry gate locked/g, t('entryGateLocked'));
  translatedDescription = translatedDescription.replace(/Self cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/Self Cooking not allowed/g, t('selfCookingNotAllowedNote'));
  translatedDescription = translatedDescription.replace(/Self Cooking allowed/g, t('selfCookingAllowed'));
  translatedDescription = translatedDescription.replace(/Self cleaning/g, t('selfCleaning'));
  translatedDescription = translatedDescription.replace(/2 Boys can stay in this room/g, t('twoBoysCanStay'));
  translatedDescription = translatedDescription.replace(/Gas Geyser Cylinder Should Refill by students/g, t('gasGeyserCylinderRefill'));
  translatedDescription = translatedDescription.replace(/Student Addhar card/g, t('studentAadharCard'));
  translatedDescription = translatedDescription.replace(/photo and paraent phone number is mandatory/g, t('photoAndParentPhoneMandatory'));
  
  // Additional missing patterns
  translatedDescription = translatedDescription.replace(/No drinking and smoking allowed in room/g, t('noDrinkingSmoking'));
  translatedDescription = translatedDescription.replace(/Good Behaviour is required/g, t('goodBehaviourRequired'));
  translatedDescription = translatedDescription.replace(/Garbage Management by students/g, t('garbageManagementByStudents'));
  translatedDescription = translatedDescription.replace(/Group Studies are not allowed/g, t('groupStudiesNotAllowed'));
  translatedDescription = translatedDescription.replace(/If there are three student in room then the electricity and water bill will be paid by students/g, t('electricityWaterBillByStudents'));
  translatedDescription = translatedDescription.replace(/Only Laptop and Mobile Charging is allowed/g, t('onlyLaptopMobileCharging'));
  translatedDescription = translatedDescription.replace(/Hairdryer and other electronics is not allowed/g, t('hairdryerElectronicsNotAllowed'));
  translatedDescription = translatedDescription.replace(/dedicated space for washing cloth/g, t('dedicatedWashingSpace'));
  translatedDescription = translatedDescription.replace(/Stairs with Auto Light Sensor/g, t('stairsAutoLightSensor'));
  translatedDescription = translatedDescription.replace(/Electric Induction for Cooking/g, t('electricInductionCooking'));
  translatedDescription = translatedDescription.replace(/New Rooms/g, t('newRooms'));
  translatedDescription = translatedDescription.replace(/Owner's Mess/g, t('ownerMess'));
  
  return translatedDescription;
};

const translateFeature = (feature, t) => {
  const featureMap = {
    'GAS GEYSER': t('gasGeyser'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'Charging Bulb for electricity issue': t('chargingBulbForElectricityIssue'),
    'PARKING': t('parking'),
    'Study Table for Students': t('studyTable'),
    '3 CHAIRS FOR STUDENTS': t('chairsForStudents'),
    'MESS IN NEIGHBOUR HOUSE': t('messInNeighbour'),
    'TERRACE ACCESS': t('terraceAccess'),
    'Hot Water': t('hotWater'),
    'Cubert': t('cubert'),
    'Basic furniture': t('basicFurniture'),
    'NEAR BY MESS': t('nearByMess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parents allowed for stay': t('parentsAllowedStay'),
    'Garbage Management by owner': t('garbageManagement'),
    'Solar Panel': t('solarPanel'),
    'Cloth Drying Area': t('clothDryingArea'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'Water Jar Provided for Drinking Water': t('waterJarProvided'),
    'Market Accessible': t('marketAccessible'),
    'Gas Geyser Cylinder Should Refill by students': t('gasGeyserCylinder'),
    '3 Floor buliding': t('threeFloorBuilding'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'BEDS': t('beds'),
    'CUBERT': t('cubert'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'shoes stand': t('shoesStand'),
    'Grbage Mnagement by owner': t('garbageManagementByOwner'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Solar Panel': t('solarPanel'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinking'),
    'Market Accessible': t('marketAccessible'),
    'Mattress': t('mattress'),
    'Dressing Table': t('dressingTable'),
    'cloth Drying Space': t('clothDryingSpace'),
    'Charging Bulb for electricity issue': t('chargingBulbForElectricityIssue'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinkingWater'),
    'Market Accessible': t('marketAccessible'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'OWNER HAVE MESS': t('ownerHaveMess'),
    'CHARGING BULB FOR ELECTRICITY ISSUE': t('chargingBulbForElectricityIssue'),
    'AQUA FILTRE': t('aquaFiltre'),
    'fOR LIGHT BILL SEPRATE METER': t('forLightBillSeparateMeter'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'WATER SUPPLY': t('waterSupply'),
    'SELF COOKING ALLOW': t('selfCookingAllowed'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'WIFI': t('wifi'),
    'WATER SUPPLY': t('waterSupply'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'BEDS': t('beds'),
    'shoes stand': t('shoesStand'),
    'Parets allowed for stay': t('parentsAllowedForStay'),
    'OWNER HAVE MESS': t('ownerHaveMess'),
    'SELF COOKING  ALLOW': t('selfCookingAllowed'),
    'fOR LIGHT BILL SEPRATE METER': t('forLightBillSeparateMeter'),
    'CHARGING BULB FOR ELECTRICITY ISSUE': t('chargingBulbForELECTRICITYtIssue'),
    'AQUA FILTRE': t('aquaFiltre'),
    'Cloth Drying Area': t('clothDryingArea'),
    'CCTV CAMERA': t('cctvCamera'),
    'SECURITY': t('security'),
    'LADY DOCTOR SUPPORT': t('ladyDoctorSupport'),
    'shoes stand': t('shoesStand'),
    'Grbage Mnagement by owner': t('garbageManagementByOwner'),
    'Parents allowed for stay': t('parentsAllowedForStay'),
    'Solar Panel': t('solarPanel'),
    'WIFI(If Student want they can have it by their own)': t('wifiIfStudentWant'),
    'NEAR BY MESS': t('nearByMess'),
    'TERRACE ACCESS': t('terraceAccess'),
    'STUDY TABLE FOR STUDENTS': t('studyTableForStudents'),
    'PARKING': t('parking'),
    'BEDS': t('beds'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinking'),
    'Market Accessible': t('marketAccessible'),
    'Mattress': t('mattress'),
    'Dressing Table': t('dressingTable'),
    'cloth Drying Space': t('clothDryingSpace'),
    'Charging Bulb for electricity issue': t('chargingBulbFoElectricityIssue'),
    'Water Jar Provided for Drinking Water': t('waterJarProvidedForDrinkingWater'),
    'Market Accessible': t('marketAccessible')
  };
  
  return featureMap[feature] || feature;
};

const translateRoomType = (roomType, t) => {
  const roomTypeMap = {
    'Single Room': t('singleRoom'),
    '1 RK': t('oneRK'),
    '1 RK & 1 Hall': t('oneRKAndHall'),
    '1 RK & 1RK': t('oneRKAndOneRK'),
    'Cot Basis': t('cotBasis'),
    '1 RK, 1RK & 1 Hall': t('oneRKAndHall'),
    '1 RK, 1RK & 1 Hall': t('oneRKAndHall')
  };
  
  return roomTypeMap[roomType] || roomType;
};
