import {Observation} from './observation';
import {Patient, Practitioner} from './personnel';

export type InvestigationRequest<IRq extends Data> = Resource<
  'InvestigationRequest',
  {
    /**
     * Date associated with the investigation request
     */
    data: IRq;

    /**
     * Intended subjected of the investigation
     */
    subject: Referred<Patient>;

    /**
     * Personnel requesting the investigation
     * (ideally should be someone with authority)
     */
    requester: Nullable<Referred<Practitioner>>;
  }
>;

export type InvestigationResult<IRs extends Data> = Resource<
  'InvestigationResult',
  {
    /**
     * Request that warrants the result to be generated
     */
    authorizingRequest: Referred<InvestigationRequest<Data>>;

    /**
     * Recorder of the observation
     * (e.g. Lab Tech)
     */
    recorder: Nullable<Referred<Practitioner>>;

    /**
     * observation collected from the investigation
     */
    observation: Referred<Observation<IRs>>;
  }
>;

export type Report<
  Code extends string,
  D extends Data,
  C extends string = string,
> = Resource<
  'Report',
  {
    reportCode: Code;

    /**
     * Subject of the observation
     */
    subject: Referred<Patient>;

    /**
     * Reporter of the observation
     */
    reporter: Nullable<Referred<Practitioner> | Referred<Patient>>;

    /**
     * observation attached to the report
     */
    result: Referred<Observation<D>>;
  },
  C
>;
