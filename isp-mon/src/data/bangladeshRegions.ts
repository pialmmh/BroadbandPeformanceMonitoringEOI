export interface District {
  id: string;
  name: string;
  bengaliName?: string;
  coordinates?: [number, number];
}

export interface Division {
  id: string;
  name: string;
  bengaliName?: string;
  districts: District[];
  coordinates?: [number, number];
}

export const bangladeshDivisions: Division[] = [
  {
    id: 'dhaka',
    name: 'Dhaka',
    bengaliName: 'ঢাকা',
    coordinates: [23.8103, 90.4125],
    districts: [
      { id: 'dhaka-city', name: 'Dhaka', bengaliName: 'ঢাকা' },
      { id: 'gazipur', name: 'Gazipur', bengaliName: 'গাজীপুর' },
      { id: 'manikganj', name: 'Manikganj', bengaliName: 'মানিকগঞ্জ' },
      { id: 'munshiganj', name: 'Munshiganj', bengaliName: 'মুন্সিগঞ্জ' },
      { id: 'narayanganj', name: 'Narayanganj', bengaliName: 'নারায়ণগঞ্জ' },
      { id: 'tangail', name: 'Tangail', bengaliName: 'টাঙ্গাইল' },
      { id: 'faridpur', name: 'Faridpur', bengaliName: 'ফরিদপুর' },
      { id: 'gopalganj', name: 'Gopalganj', bengaliName: 'গোপালগঞ্জ' },
      { id: 'kishoreganj', name: 'Kishoreganj', bengaliName: 'কিশোরগঞ্জ' },
      { id: 'madaripur', name: 'Madaripur', bengaliName: 'মাদারীপুর' },
      { id: 'rajbari', name: 'Rajbari', bengaliName: 'রাজবাড়ি' },
      { id: 'shariatpur', name: 'Shariatpur', bengaliName: 'শরীয়তপুর' },
      { id: 'narsingdi', name: 'Narsingdi', bengaliName: 'নরসিংদী' }
    ]
  },
  {
    id: 'chittagong',
    name: 'Chittagong',
    bengaliName: 'চট্টগ্রাম',
    coordinates: [22.3569, 91.7832],
    districts: [
      { id: 'chittagong-city', name: 'Chittagong', bengaliName: 'চট্টগ্রাম' },
      { id: 'coxsbazar', name: "Cox's Bazar", bengaliName: 'কক্সবাজার' },
      { id: 'rangamati', name: 'Rangamati', bengaliName: 'রাঙ্গামাটি' },
      { id: 'bandarban', name: 'Bandarban', bengaliName: 'বান্দরবান' },
      { id: 'khagrachari', name: 'Khagrachari', bengaliName: 'খাগড়াছড়ি' },
      { id: 'feni', name: 'Feni', bengaliName: 'ফেনী' },
      { id: 'noakhali', name: 'Noakhali', bengaliName: 'নোয়াখালী' },
      { id: 'lakshmipur', name: 'Lakshmipur', bengaliName: 'লক্ষ্মীপুর' },
      { id: 'comilla', name: 'Comilla', bengaliName: 'কুমিল্লা' },
      { id: 'chandpur', name: 'Chandpur', bengaliName: 'চাঁদপুর' },
      { id: 'brahmanbaria', name: 'Brahmanbaria', bengaliName: 'ব্রাহ্মণবাড়িয়া' }
    ]
  },
  {
    id: 'sylhet',
    name: 'Sylhet',
    bengaliName: 'সিলেট',
    coordinates: [24.8949, 91.8687],
    districts: [
      { id: 'sylhet-city', name: 'Sylhet', bengaliName: 'সিলেট' },
      { id: 'moulvibazar', name: 'Moulvibazar', bengaliName: 'মৌলভীবাজার' },
      { id: 'habiganj', name: 'Habiganj', bengaliName: 'হবিগঞ্জ' },
      { id: 'sunamganj', name: 'Sunamganj', bengaliName: 'সুনামগঞ্জ' }
    ]
  },
  {
    id: 'rajshahi',
    name: 'Rajshahi',
    bengaliName: 'রাজশাহী',
    coordinates: [24.3745, 88.6042],
    districts: [
      { id: 'rajshahi-city', name: 'Rajshahi', bengaliName: 'রাজশাহী' },
      { id: 'natore', name: 'Natore', bengaliName: 'নাটোর' },
      { id: 'naogaon', name: 'Naogaon', bengaliName: 'নওগাঁ' },
      { id: 'chapainawabganj', name: 'Chapainawabganj', bengaliName: 'চাঁপাইনবাবগঞ্জ' },
      { id: 'pabna', name: 'Pabna', bengaliName: 'পাবনা' },
      { id: 'sirajganj', name: 'Sirajganj', bengaliName: 'সিরাজগঞ্জ' },
      { id: 'bogra', name: 'Bogra', bengaliName: 'বগুড়া' },
      { id: 'joypurhat', name: 'Joypurhat', bengaliName: 'জয়পুরহাট' }
    ]
  },
  {
    id: 'khulna',
    name: 'Khulna',
    bengaliName: 'খুলনা',
    coordinates: [22.8456, 89.5403],
    districts: [
      { id: 'khulna-city', name: 'Khulna', bengaliName: 'খুলনা' },
      { id: 'bagerhat', name: 'Bagerhat', bengaliName: 'বাগেরহাট' },
      { id: 'satkhira', name: 'Satkhira', bengaliName: 'সাতক্ষীরা' },
      { id: 'jessore', name: 'Jessore', bengaliName: 'যশোর' },
      { id: 'narail', name: 'Narail', bengaliName: 'নড়াইল' },
      { id: 'magura', name: 'Magura', bengaliName: 'মাগুরা' },
      { id: 'jhenaidah', name: 'Jhenaidah', bengaliName: 'ঝিনাইদহ' },
      { id: 'chuadanga', name: 'Chuadanga', bengaliName: 'চুয়াডাঙ্গা' },
      { id: 'kushtia', name: 'Kushtia', bengaliName: 'কুষ্টিয়া' },
      { id: 'meherpur', name: 'Meherpur', bengaliName: 'মেহেরপুর' }
    ]
  },
  {
    id: 'barisal',
    name: 'Barisal',
    bengaliName: 'বরিশাল',
    coordinates: [22.7010, 90.3535],
    districts: [
      { id: 'barisal-city', name: 'Barisal', bengaliName: 'বরিশাল' },
      { id: 'patuakhali', name: 'Patuakhali', bengaliName: 'পটুয়াখালী' },
      { id: 'barguna', name: 'Barguna', bengaliName: 'বরগুনা' },
      { id: 'bhola', name: 'Bhola', bengaliName: 'ভোলা' },
      { id: 'jhalokati', name: 'Jhalokati', bengaliName: 'ঝালকাঠি' },
      { id: 'pirojpur', name: 'Pirojpur', bengaliName: 'পিরোজপুর' }
    ]
  },
  {
    id: 'rangpur',
    name: 'Rangpur',
    bengaliName: 'রংপুর',
    coordinates: [25.7468, 89.2508],
    districts: [
      { id: 'rangpur-city', name: 'Rangpur', bengaliName: 'রংপুর' },
      { id: 'dinajpur', name: 'Dinajpur', bengaliName: 'দিনাজপুর' },
      { id: 'thakurgaon', name: 'Thakurgaon', bengaliName: 'ঠাকুরগাঁও' },
      { id: 'panchagarh', name: 'Panchagarh', bengaliName: 'পঞ্চগড়' },
      { id: 'nilphamari', name: 'Nilphamari', bengaliName: 'নীলফামারী' },
      { id: 'lalmonirhat', name: 'Lalmonirhat', bengaliName: 'লালমনিরহাট' },
      { id: 'kurigram', name: 'Kurigram', bengaliName: 'কুড়িগ্রাম' },
      { id: 'gaibandha', name: 'Gaibandha', bengaliName: 'গাইবান্ধা' }
    ]
  },
  {
    id: 'mymensingh',
    name: 'Mymensingh',
    bengaliName: 'ময়মনসিংহ',
    coordinates: [24.7471, 90.4203],
    districts: [
      { id: 'mymensingh-city', name: 'Mymensingh', bengaliName: 'ময়মনসিংহ' },
      { id: 'jamalpur', name: 'Jamalpur', bengaliName: 'জামালপুর' },
      { id: 'netrokona', name: 'Netrokona', bengaliName: 'নেত্রকোণা' },
      { id: 'sherpur', name: 'Sherpur', bengaliName: 'শেরপুর' }
    ]
  }
];