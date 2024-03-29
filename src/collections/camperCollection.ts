import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
  EntityReference,
  EntityOnSaveProps,
  EntityOnDeleteProps,
} from '@camberi/firecms';
import { getCollectionData, makeURLfromName } from '../utils/helpers';
import { revalidatePage } from '../utils/nextRevalidate';

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
  isPublished: boolean;

  name: string;
  urlSlug: string;
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
  metaTitle: string;
  metaDescription: string;
};

let revalidateSignal = '';

const camperCallbacks = buildEntityCallbacks({
  onPreSave: async ({ values, entityId, context }) => {
    // Check if there was a switch in published status
    if (entityId) {
      const res = await getCollectionData(
        context,
        'campers',
        camperCollection,
        entityId
      );
      // If no errors check difference in isPublished or Campervan name
      if (typeof res !== 'undefined') {
        if (
          res.isPublished !== values.isPublished ||
          res.name !== values.name
        ) {
          revalidateSignal = 'REBUILD';
        }
      }
    }
    // return the updated values
    values.urlSlug = makeURLfromName(values.name as string);

    if (!values.metaTitle) {
      values.metaTitle = 'Wynajem kamperów Kraków - ' + values.name;
    }

    if (!values.metaDescription) {
      values.metaDescription = `Wynajem kampera w Krakowie - ${values.name}. Zapraszamy do zapoznania się z naszą ofertą wynajmu kamperów i skorzystania z naszych usług!`;
    }
    return values;
  },

  // update server
  onSaveSuccess: async ({
    context,
    values,
    status,
  }: EntityOnSaveProps<Camper>) => {
    // Rebuild app because of new entity or signal switch
    if (status !== 'existing' || revalidateSignal === 'REBUILD') {
      revalidateSignal = '';
      // code for rebuilding
      const res = await revalidatePage(context, 'rebuild');
      console.log(res);
      console.log('PAGE REBUILD');
      return;
    }
    // If entity exist we only revalidate
    if (values.isPublished) {
      const res = await revalidatePage(context, '/kampery/' + values.urlSlug);
      console.log(res);
    }
  },
  onDelete: async ({ context }: EntityOnDeleteProps<Camper>) => {
    // After delete we must rebuild entire app
    const res = await revalidatePage(context, 'rebuild');
    console.log(res);
    console.log('PAGE REBUILD');
  },
});

export const camperCollection = buildCollection<Camper>({
  name: 'Kampery',
  singularName: 'camper',
  icon: 'AirportShuttle',
  path: 'campers',
  defaultSize: 'm',
  description: 'Dodawaj, edytuj i usuwaj kampery',
  exportable: true,
  group: 'główne',
  permissions: ({ authController }) => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    isPublished: {
      name: 'Opublikowane',

      defaultValue: true,
      dataType: 'boolean',
      description:
        'Czy kamper ma być opublikowany na stronie?(Domyslnie wlaczone)',
    },

    name: {
      name: 'Nazwa modelu',

      validation: { required: true },
      dataType: 'string',
    },
    urlSlug: {
      name: 'Adres url',
      dataType: 'string',
      disabled: true,
      hideFromCollection: true,
      description: 'To pole zostanie zapisane przed zapisaniem',
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
      validation: { required: true },
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
      validation: { required: true },
      name: 'Wybierz główne udogodnienia',
      of: {
        dataType: 'reference',
        path: 'mainAmenities',
      },
    },

    genericAmenities: {
      name: 'Ogólne udogodnienia',
      description:
        'WAŻNE! oddzielaj przecinakami np. hak holowniczy, klimatyzacja silinkowa, esp',
      dataType: 'string',

      multiline: true,
      validation: { required: true },
    },
    kitchenAmenities: {
      name: 'Udogodnienia części kuchennej',
      description:
        'oddzielaj przecinakami np. grill Elektryczny, kuchnia gazowa, zestaw sztućców',
      dataType: 'string',

      multiline: true,
      validation: { required: true },
    },
    usableAmenities: {
      name: 'Udogodnienia części sypialno-użytkowej',
      description:
        'oddzielaj przecinakami np. 3 łóżka, smart TV, dywaniki w kabinie kierowcy',
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
      name: 'Dodatkowe informacje do udogodnień',
      description: 'Np. Wyposażenie dodatkowe w cenie wynajmu.',
      multiline: true,
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
            description: 'podaj samą kwotę bez jednostek',
            dataType: 'number',
          },
          sesons: {
            name: 'Sezony',
            description: 'np. lipiec-sierpień',
            dataType: 'string',
          },
          info: {
            name: 'Dodatkowe info o rabatach',
            description: 'np. Przy wynajmie powyżej 14dni 5% zniżki',
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
          validation: { required: true },
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
    metaTitle: {
      name: 'Tytuł strony SEO',
      dataType: 'string',
      description:
        'Pamietaj by tytuł nie był za długi optimum to tak ok 70 znaków',
    },

    metaDescription: {
      name: 'Opis do strony do SEO',
      dataType: 'string',
      description:
        'Pamietaj by opis nie był za długi optimum to tak ok 160 znaków',
    },
  },
  callbacks: camperCallbacks,
});
