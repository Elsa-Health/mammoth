/**
 * Context + Hooks for search
 * --------------------------
 * Managing component state:
 */
import React from "react";
import create from "zustand";
import createContext from "zustand/context";
import shallow from "zustand/shallow";
import { useApplication } from "../../../../app/context/app";
import { symptoms } from "../../../../app/symptoms";
import { buildSearch } from "./misc";

import { SymptomId } from "../../../../../@types";

import * as data from '../../../../app/libs/data-fns'


type Suggestion = SymptomId
interface SearchState {
    searchInput: string | undefined
    matchedIndices: number[]
    suggestions: Suggestion[]
    setSearchInput: (str: string | undefined) => void
    setMatchedIndices: (indices: number[]) => void
}

const { Provider, useStore } = createContext<SearchState>()

const buildStore = (suggestions: Suggestion[] | undefined = []) => () => create<SearchState>((set, get) => ({
    searchInput: undefined,
    matchedIndices: [],
    suggestions: suggestions, // || [ 'fever', 'cough' ],

    setSearchInput: (input: string | undefined) => {
        // Setting the searched item
        set({
            searchInput: input
        })
    },

    setMatchedIndices: (indices: number[]) => {
        // set indices that match the information
        set({
            matchedIndices: indices
        })
    }
}))

/**
 * Provider to feed information about the search data
 * @param param0 
 * @returns 
 */
export function SearchProvider ({ children, suggestions }: { children: React.ReactNode, suggestions?: Suggestion[] }) {
    return (
        <Provider createStore={buildStore(suggestions)}>
            {children}
        </Provider>
    )
}

/**
 * Hook for using the search object
 * @returns 
 */
export function useSearchInput(): [string | undefined, (input: string | undefined) => void] {
    const text = useStore(s => s.searchInput)
    const [setter, setIdxs] = useStore(s => [s.setSearchInput, s.setMatchedIndices])
 
    const lang = useApplication(s => s.settings.lang, shallow)
    const { searchByTags } = React.useMemo(() => buildSearch(lang), [lang])

    React.useEffect(() => {
        // TODO: perform the search algorithm
        //  and apply the search items
        if (text === undefined || text === "") {
            // reset the items
            setIdxs([])
            return;
        }

        // else render the items
        setIdxs(searchByTags(text))
    }, [lang, text, searchByTags])

    return [text, setter]
}

/**
 * THINK: There might be a need to make the contents of the search be possible for either languages.
 */
export function useSearchData() {
    const suggestions = useStore(s => s.suggestions)
    const indices = useStore(s => s.matchedIndices)

    const lang = useApplication(s => s.settings.lang, shallow)
    
    return { 
        suggestions, 
        items: indices.filter(ix => ix <= symptoms.length)
                        .map(ix => symptoms[ix].id)
                        .map(id => ({ id, ...data.symptomsLocale.translate(lang || 'en')[id as SymptomId]}))
                        // .map(s => ({ id: s, ...symptomTranslation[lang || 'en'][s as SymptomId]}))
    }
}
