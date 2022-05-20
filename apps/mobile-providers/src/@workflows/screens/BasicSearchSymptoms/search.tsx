/**
 * Context + Hooks for search
 * --------------------------
 * Managing component state:
 */
import React from 'react';
import create from 'zustand';
import createContext from 'zustand/context';
import {buildSearch} from './misc';

import * as data from '../../../@libs/data-fns';
import {symptoms} from '../../helpers/symptoms';
import {SymptomId} from '../../../../@types';

type Suggestion = SymptomId;
interface SearchState {
  searchInput: string | undefined;
  matchedIndices: number[];
  suggestions: Suggestion[];
  setSearchInput: (str: string | undefined) => void;
  setMatchedIndices: (indices: number[]) => void;
}

const {Provider, useStore} = createContext<SearchState>();

const buildStore =
  (suggestions: Suggestion[] | undefined = []) =>
  () =>
    create<SearchState>((set, get) => ({
      searchInput: undefined,
      matchedIndices: [],
      suggestions: suggestions, // || [ 'fever', 'cough' ],

      setSearchInput: (input: string | undefined) => {
        // Setting the searched item
        set({
          searchInput: input,
        });
      },

      setMatchedIndices: (indices: number[]) => {
        // set indices that match the information
        set({
          matchedIndices: indices,
        });
      },
    }));

/**
 * Provider to feed information about the search data
 * @param param0
 * @returns
 */
export function SearchProvider({
  children,
  suggestions,
}: {
  children: React.ReactNode;
  suggestions?: Suggestion[];
}) {
  return <Provider createStore={buildStore(suggestions)}>{children}</Provider>;
}

/**
 * Hook for using the search object
 * @returns
 */
export function useSearchInput(
  lang: Language,
): [string | undefined, (input: string | undefined) => void] {
  const text = useStore(s => s.searchInput);
  const [setter, setIdxs] = useStore(s => [
    s.setSearchInput,
    s.setMatchedIndices,
  ]);

  const {searchByTags} = React.useMemo(
    () =>
      buildSearch(
        lang,
        data.symptoms.ids() as SymptomId[],
        id => data.symptomsLocale.translate(lang)[id],
      ),
    [lang],
  );

  React.useEffect(() => {
    // TODO: perform the search algorithm
    //  and apply the search items
    if (text === undefined || text === '') {
      // reset the items
      setIdxs([]);
      return;
    }

    // else render the items
    setIdxs(searchByTags(text));
  }, [lang, text, searchByTags]);

  return [text, setter];
}

/**
 * THINK: There might be a need to make the contents of the search be possible for either languages.
 */
export function useSearchData(lang: Language) {
  const suggestions = useStore(s => s.suggestions);
  const indices = useStore(s => s.matchedIndices);

  return {
    suggestions,
    items: indices
      .filter(ix => ix <= symptoms.length)
      .map(ix => symptoms[ix].id)
      .map(id => ({
        id,
        ...data.symptomsLocale.translate(lang)[id as SymptomId],
      })),
    // .map(s => ({ id: s, ...symptomTranslation[lang || 'en'][s as SymptomId]}))
  };
}
