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

export type InvestigationResult<InvReq extends InvestigationRequest<Data>> =
  Resource<
    'InvestigationResult',
    {
      /**
       * Request that warrants the result to be generated
       */
      authorizingRequest: Referred<InvReq>;

      /**
       * Recorder of the observation
       * (e.g. Lab Tech)
       */
      recorder: Nullable<Referred<Practitioner>>;

      /**
       * observation collected from the investigation
       */
      observation: Referred<Observation<InvReq['data']>>;
    }
  >;

export type Report<
  Code extends string,
  D extends Data,
  C extends string | null = string,
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
    result: D;
  },
  C
>;
