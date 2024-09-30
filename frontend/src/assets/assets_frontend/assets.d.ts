declare const assets: {
    [key: string]: string;
};

interface SpecialityItem {
  speciality: string;
  image: string;
}

declare const specialityData: SpecialityItem[];

interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
      line1: string;
      line2: string;
  };
}

declare const doctors: Doctor[];

export { assets, specialityData, doctors };