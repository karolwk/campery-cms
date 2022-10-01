import {
  buildCollection,
  buildProperty,
  EntityReference,
} from '@camberi/firecms';

type MainAmenities = {
  name: string;
  icons: string[];
};

type Icons = {
  name: string;
  iconPath: string;
};

export const mainAmenitiesCollection = buildCollection<MainAmenities>({
  name: 'Główne udogodnienia',
  singularName: 'mainAmenities',
  path: 'mainAmenities',
  description: 'Dodawaj, edytuj i usuwaj kampery',
  exportable: true,
  group: 'dodatkowe',
  properties: {
    name: {
      name: 'rodzaj udogodnienia',
      validation: { required: true },
      dataType: 'string',
    },
    icons: {},
  },
});
