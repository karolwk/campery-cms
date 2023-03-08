import { buildCollection } from '@camberi/firecms';

type TokenColletion = {
  isrToken: string;
};
export const tokensCollection = buildCollection<TokenColletion>({
  name: 'Tokeny',
  description: 'Tokeny do komunikacji z frontem strony',
  hideFromNavigation: true,
  path: 'tokens',
  singularName: 'Tokeny',
  group: 'pozostałe',
  properties: {
    isrToken: {
      dataType: 'string',
      name: 'Token ISR',
      description:
        'Token służąc do rewitalizacji, zmiana może spowodować problemy z zapisywaniem zmian.',
    },
  },
});
