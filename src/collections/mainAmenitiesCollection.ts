import { buildCollection, EntityReference } from '@camberi/firecms';
import IconPreview from '../components/ui/Previews/IconPreview';

type MainAmenities = {
  name: string;
  icon: string;
};

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
      description: 'Ustaw ikone opisującą udogodnienie',
      Preview: IconPreview,
      validation: { required: true },
    },
  },
});
