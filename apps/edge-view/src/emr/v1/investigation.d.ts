import { Observation } from "./observation";
import { Patient, Practitioner } from "./personnel";

export type InvestigationRequest<IRq extends Data> = Resource<
	"InvestigationRequest",
	{
		data: IRq;
		requester: Nullable<Referred<Practitioner>>;
	}
>;

export type InvestigationResult<IRs extends Data> = Resource<
	"InvestigationResult",
	{
		/**
		 * Reporter of the observation
		 */
		recorder: Nullable<Referred<Practitioner>>;

		// result
		observation: Referred<Observation<IRs>>;
	}
>;

// export type Investigation<D extends Data> = Report<"investigation", D>;
export type Investigation<
	IRq extends Data = Data,
	IRs extends Data = Data
> = Resource<
	"Investigation",
	{
		subject: Referred<Patient>;

		// nullable is set for the
		request: Nullable<Referred<InvestigationRequest<IRq>>>;

		result: Nullable<Referred<InvestigationResult<IRs>>>;
	}
>;

export type Report<
	Code extends string,
	D extends Data,
	C extends string = string
> = Resource<
	"Report",
	{
		reportCode: Code;

		/**
		 * Subject of the observation
		 */
		subject: Referred<Patient>;

		/**
		 * Reporter of the observation
		 */
		reporter: Nullable<Referred<Patient | Practitioner>>;

		/**
		 * observation attached to the report
		 */
		result: Referred<Observation<D>>;
	},
	C
>;
