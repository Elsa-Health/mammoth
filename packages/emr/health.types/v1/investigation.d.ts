import { Observation } from "./observation";
import { Patient, Practitioner } from "./personnel";
import { Nullable, Referred, Resource, UTCDateTimeString } from "./_primitives";

export type InvestigationRequest<IRq extends Data = Data> = Resource<
	"InvestigationRequest",
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

export type InvestigationResult<
	Shape extends Data,
	D extends Data,
	InvReq extends InvestigationRequest
> = Resource<
	"InvestigationResult",
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
		 * Expected shape of the investigation result
		 */
		shape: Shape;

		/**
		 * Last time the result was updated
		 */
		lastUpdatedAt: UTCDateTimeString;

		/**
		 * observation collected from the investigation
		 */
		observation: Observation<D>;
	}
>;

export type Report<
	Code extends string,
	D extends Data = Data,
	C extends string | null = string
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
		reporter: Nullable<Referred<Practitioner> | Referred<Patient>>;

		/**
		 * observation attached to the report
		 */
		result: D;
	},
	C
>;
