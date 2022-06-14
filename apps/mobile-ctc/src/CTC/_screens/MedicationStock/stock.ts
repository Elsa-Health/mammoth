import _ from 'lodash';
import {ARV} from 'elsa-health-data-fns';
import {List, Set} from 'immutable';

export type ARVSingle = string;
function ArvRegimenSingles() {
  return Set(
    ARV.regimen
      .values()
      .map(d => d.split('=')[1].trim().replaceAll('+', '-').split('-'))
      .reduceRight((d, c) => [...d, ...c])
      .filter(d => !d.toLowerCase().startsWith('other')),
  );
}

const singles = ArvRegimenSingles();
const pairs = Object.fromEntries(
  singles.map(d => [_.kebabCase(d), d]).toArray(),
);

export const ARVSingles = {
  keys: () => Object.keys(pairs),
  pairs: () => Object.entries(pairs),
  values: () => Object.values(pairs),
  fromKey: (key: ARVSingle): string | undefined => pairs[key],
};
