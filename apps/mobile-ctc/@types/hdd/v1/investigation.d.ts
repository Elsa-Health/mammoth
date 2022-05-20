import {Observation} from './observation';
import {Patient, Practitioner} from './personnel';

// export type Investigation<D extends Data> = Report<"investigation", D>;
export type Investigation<
  InvRequestData extends Data = Data,
  InvestigationResult extends Data = Data,
> = Resource<
  'Investigation',
  {
    subject: Referred<Patient>;

    request: Referred<
      Resource<
        'InvestigationRequest',
        {
          data: InvRequestData;
          requester: Nullable<Referred<Practitioner>>;
        }
      >
    >;

    result: Nullable<
      Referred<
        Resource<
          'InvestigationResult',
          {
            /**
             * Reporter of the observation
             */
            recorder: Nullable<Referred<Practitioner>>;

            // result
            observation: Referred<Observation<InvestigationResult>>;
          }
        >
      >
    >;
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
    reporter: Referred<Patient | Practitioner>;

    /**
     * observation attached to the report
     */
    result: Referred<Observation<D>>;
  },
  C
>;
