// Simple Mess data similar in spirit to rooms
// A "mess" is a communal dining option for students/tenants

export const sampleMess = [
  {
    id: 1,
    title: "Swami Mess Veg/Non-Veg",
    location: "Near College Main Gate",
    contact: "+91 7020319571",
    mapLink: "https://maps.app.goo.gl/s5FRY9czMYfEV6mA7?g_st=aw",
    pricing: {
      monthly: {
        boys: {
          withoutBreakfast:2400,
          withBreakfast: 3000,
        },
        girls: {
          withoutBreakfast: 2200,
          withBreakfast: 2800
        }
      },
      perMeal:40,
      perPlate: {
        description: "3 chapati, bhaji, rice, pickle, papad",
        addons: {
          festivalSweet: {
            description: "Sweet provided on festivals",
            frequency: "Festival days"
          },
          specials: {
            wednesday: {
              nonVeg: "Egg curry (1 egg)",
              veg: "Normal bhaji"
            },
            sunday: {
              nonVeg: "Chicken curry (4 pieces)",
              veg: "Paneer or Kaju curry with sweet"
            }
          }
        }
      }
    },
    cuisine: ["Veg", "Non-Veg"],
    timings: {
      breakfast: "08:30 AM - 10:00 AM",
      lunch: "12:30 PM - 02:30 PM",
      dinner: "08:30 PM - 10:00 PM"
    },
    breakfastMenu: ["Shira", "Upit", "Pohe","Special Breakfast on Sunday"],
    rules: {
      leavePolicy: "Leave considered only if more than 5 days",
      messOff: "Twice a month mess is off",
      chapatiPolicy: {
        breakfast: "N/A",
        lunch: "Limited 4 chapati",
        dinner: "Limited 4 chapati",
      },
      service: "Self service during eating"
    },
    images: [
      "/mess/Swami mess/swami 0_converted.avif",
      "/mess/Swami mess/swami 1_converted.avif",
      "/mess/Swami mess/swami 2_converted.avif"
    ],
    features: ["Hygienic kitchen", "RO water", "Seating available"]
  },
  {
      id: 2,
      title: "Gurukrupa Mess Veg/Non-Veg",
      location: "Salokhenagar, Klamba",
      contact: "+91 7385387623",
      mapLink: "https://maps.app.goo.gl/ZJjfSey6NA3WPigVA?g_st=aw",
      pricing: {
        monthly: {
          boys: {
            withoutBreakfast:2500,
            withBreakfast: 3000,
          },
          girls: {
            withoutBreakfast: 2300,
            withBreakfast: 2800
          }
        },
        perMeal:70,
        perPlate: {
          description: "3 chapati, bhaji, rice, pickle, papad",
          addons: {
            festivalSweet: {
              description: "Sweet provided on festivals",
              frequency: "Festival days"
            },
            specials: {
              wednesday: {
                nonVeg: "Egg curry (1 egg)",
                veg: "Paneer or Basundi with sweet"
              },
              sunday: {
                nonVeg: "Chicken curry (4 pieces)",
                veg: "Paneer or Basundi with sweet"
              }
            }
          }
        }
      },
      cuisine: ["Veg", "Non-Veg"],
      timings: {
        breakfast: "08:30 AM - 10:00 AM",
        lunch: "12:30 PM - 02:30 PM",
        dinner: "08:30 PM - 10:00 PM"
      },
      breakfastMenu: ["Shira", "Upit", "Pohe","Special Breakfast on Sunday","Maggie,Pasta"],
      rules: {
        leavePolicy: "Leave considered only if more than 5 days",
        messOff: "Twice a month mess is off",
        chapatiPolicy: {
          breakfast: "N/A",
          lunch: "Unlimited",
          dinner: "Unlimited",
        },
        service: "Self service during eating"
      },
      images: [
        "/mess/Gurukrupa mess/guru 0_converted.avif",
        "/mess/Gurukrupa mess/guru 1_converted.avif",
        "/mess/Gurukrupa mess/guru 2_converted.avif",
        "/mess/Gurukrupa mess/guru 3_converted.avif",


      ],
      features: ["Hygienic kitchen", "RO water", "Seating available"]
    },
];

export const getMess = () => sampleMess;




