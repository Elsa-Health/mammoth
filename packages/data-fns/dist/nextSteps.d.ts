import type { Condition } from "./base";
import type { LabTest, Medication } from "./recommended";
declare type Langugage = "en" | "sw";
declare type LangMap = {
    [k in Langugage]?: string;
};
export declare namespace NextSteps {
    type MoreInfo<K extends string, T = {
        text: string;
    }> = {
        id: K;
    } & T;
    type Basic<M extends string = string, T extends string = string> = {
        triageLevel: string;
        referAndTriageLevel: string;
        refer: boolean;
        medications: MoreInfo<M>[];
        testRecommendations: MoreInfo<T>[];
        otherRecommendations?: string;
    };
    type Extended<M extends string = string, T extends string = string> = {
        referAndTriageLevel: LangMap;
        medications: MoreInfo<M, LangMap>[];
        testRecommendations: MoreInfo<T, LangMap>[];
        otherRecommendations?: LangMap;
    };
    type ExtendedVals<M extends string = string, T extends string = string> = {
        referAndTriageLevel: string | undefined;
        medications: M[];
        testRecommendations: T[];
    };
}
declare type _AllMedications = Medication.Addo | Medication.GS;
export declare function basic<C extends Condition, M extends _AllMedications, L extends string>(conditionsFn: () => C[], medicationsFn: () => M[], labTestsFn: () => L[]): { [id in C]: NextSteps.Basic<M, L>; };
export declare function extended<C extends Condition, M extends _AllMedications, L extends LabTest>(conditionsFn: () => C[], medicationsFn: () => M[], labTestsFn: () => L[]): {
    all: { [id in C]: NextSteps.Extended<M, L>; };
    locale: (lang: Langugage) => { [id_1 in C]: NextSteps.Basic<M, L> & NextSteps.ExtendedVals<M, L>; };
};
export {};
//# sourceMappingURL=nextSteps.d.ts.map