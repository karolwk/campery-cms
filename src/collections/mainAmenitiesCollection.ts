import { buildCollection, buildEntityCallbacks } from '@camberi/firecms';
import IconPreview from '../components/ui/Previews/IconPreview';
import { firstLetterLowercase } from '../utils/helpers';

type MainAmenities = {
  name: string;
  icon: string;
};

const amenitiesCallbacks = buildEntityCallbacks({
  onPreSave: ({ values }) => {
    // return the updated values
    values.icon = firstLetterLowercase(values.icon);
    return values;
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
      dataType: 'string',
      name: 'Ikona',
      defaultValue: 'checkBox',
      description:
        'Ustaw ikone opisującą udogodnienie. Nazwy znajdziesz pod adresem: https://fonts.google.com/icons?icon.set=Material+Icons',
      Preview: IconPreview,
      validation: { required: true },
    },
  },
  callbacks: amenitiesCallbacks,
});
