import {
  buildCollection,
  buildProperty,
  EntityReference,
} from '@camberi/firecms';

type CamperTechnicals = {
  brand: string;
  model: string;
  year: string;
  power: string;
  cylinderCap: string;
  mileage: string;
  fuel: string;
  consumption: string;
  tank: string;
  dimensions: string;
  dimensionsBike: string;
  weight: string;
};

type Camper = {
  name: string;
  location: string;
  mainImage: string;
  images: string[];
  priceInfo: string;
  description: string;
  genericAmenities: string;
  kitchenAmenities: string;
  usableAmenities: string;
  additionalEquipment: string;
  additionalPriceInfo: string;
  price: {
    price: number;
    season: string;
    info: string;
  }[];
  technicals: CamperTechnicals;
  mainAmenities?: EntityReference[];
};

export const camperCollection = buildCollection<Camper>({
  name: 'Kampery',
  singularName: 'camper',
  icon: 'CarRental',
  path: 'campers',

  description: 'Dodawaj, edytuj i usuwaj kampery',
  exportable: true,
  group: 'główne',
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    name: {
      name: 'Nazwa modelu',
      validation: { required: true },
      dataType: 'string',
    },
    location: {
      name: 'Lokalizacja kampera',
      description: 'np. Wieliczka, Polska',
      validation: { required: true },
      dataType: 'string',
    },
    mainImage: buildProperty({
      // The `buildProperty` method is a utility function used for type checking
      name: 'Obrazek główny',
      dataType: 'string',
      storage: {
        storagePath: 'images',
        acceptedFiles: ['image/*'],
      },
    }),
    images: buildProperty({
      name: 'Galeria',
      dataType: 'array',
      description:
        'Tutaj możesz dodać wiele obrazków, najlepiej wcześnie skompresowane.',
      of: {
        dataType: 'string',
        storage: {
          storagePath: 'images',
          acceptedFiles: ['image/*'],
          metadata: {
            cacheControl: 'max-age=1000000',
          },
        },
      },
    }),

    description: {
      name: 'Opis kampera',
      dataType: 'string',
      markdown: true,
      validation: { required: true },
    },
    mainAmenities: {
      dataType: 'array',
      name: 'Wybierz główne udogodnienia',
      of: {
        dataType: 'reference',
        path: 'mainAmenities',
      },
    },

    genericAmenities: {
      name: 'Ogólne udogodnienia',
      dataType: 'string',

      multiline: true,
      validation: { required: true },
    },
    kitchenAmenities: {
      name: 'Udogodnienia części kuchennej',
      dataType: 'string',

      multiline: true,
      validation: { required: true },
    },
    usableAmenities: {
      name: 'Udogodnienia części sypialno-użytkowej',
      dataType: 'string',

      multiline: true,
      validation: { required: true },
    },

    additionalEquipment: {
      name: 'Wyposażenie dodatkowe',
      dataType: 'string',
      multiline: true,

      validation: { required: true },
    },

    priceInfo: {
      name: 'Dodatkowe informacje do cen',
      dataType: 'string',
    },

    price: {
      name: 'Ceny',
      validation: { required: true },
      dataType: 'array',
      of: {
        dataType: 'map',

        properties: {
          price: {
            name: 'Cena',
            dataType: 'number',
          },
          sesons: {
            name: 'Sezony',
            dataType: 'string',
          },
          info: {
            name: 'Dodatkowe info o rabatach',
            dataType: 'string',
          },
        },
      },
    },

    additionalPriceInfo: {
      name: 'Uwagi do cen',
      description:
        'np. Ceny brutto, uzależnione od długości wynajmu. Brak opłaty serwisowej.',
      dataType: 'string',
    },

    technicals: {
      name: 'Parametry techniczne kampera',
      dataType: 'map',
      properties: {
        brand: {
          name: 'Marka',
          dataType: 'string',
        },
        model: {
          name: 'Model',
          dataType: 'string',
        },
        year: {
          name: 'Rok produkcji',
          dataType: 'string',
        },
        power: {
          name: 'Moc silnika (w KM)',
          dataType: 'string',
        },
        cylinderCap: { name: 'Pojemność silnika', dataType: 'string' },
        mileage: {
          name: 'Przebieg',
          dataType: 'string',
        },
        fuel: {
          name: 'Rodzaj paliwa',
          dataType: 'string',
        },
        consumption: {
          name: 'Spalanie',
          dataType: 'string',
        },
        tank: {
          name: 'Pojemność baku paliwa',
          dataType: 'string',
        },
        dimensions: {
          name: 'Wymiary kampera (długość, szerokość, wysokość)',
          description: 'np. 5m/2m/2m',
          dataType: 'string',
        },
        dimensionsBike: {
          name: 'Długość kampera wliczająć bagażnik na rowery',
          dataType: 'string',
        },
        weight: {
          name: 'Masa kampera',
          dataType: 'string',
        },
      },
    },
  },
});
