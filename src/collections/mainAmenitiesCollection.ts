import { buildCollection, EntityReference } from '@camberi/firecms';

type MainAmenities = {
  name: string;
  icon: EntityReference;
};

type Icons = {
  name: string;
  iconPath: string;
};

export const iconsCollection = buildCollection<Icons>({
  name: 'Ikona',
  path: 'icons',
  description: 'Dodaj ikony',
  group: 'dodatkowe',
  hideFromNavigation: true,
  properties: {
    name: {
      name: 'Nazwa ikony',
      dataType: 'string',
    },
    iconPath: {
      name: 'Obrazek ikony',
      dataType: 'string',

      storage: {
        storagePath: 'icons',
        acceptedFiles: ['image/*'],
        maxSize: 1024 * 1024,
      },
    },
  },
});

export const mainAmenitiesCollection = buildCollection<MainAmenities>({
  name: 'Kampery - główne udogodnienia',
  singularName: 'Udogodnienie',
  path: 'mainAmenities',
  description: 'Dodawaj, edytuj i usuwaj kampery',
  icon: 'RvHookup',
  exportable: true,
  group: 'dodatkowe',
  properties: {
    name: {
      name: 'Nazwa udogodnienia',
      validation: { required: true },
      dataType: 'string',
    },
    icon: {
      dataType: 'reference',
      path: 'icons',
      name: 'Ikona',
      description: 'Wybierz ikonę opisującą udogodnienie',
    },
  },
});
