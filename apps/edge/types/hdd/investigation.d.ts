import { Observation } from "./observation";
import { Patient, Practitioner } from "./personnel";

// export type Investigation<D extends Data> = Report<"investigation", D>;
export type Investigation<
	InvRequestData extends Data,
	InvestigationResult extends Data = Data
> = Resource<
	"Investigation",
	{
		subject: Referred<Patient>;

		reporter: Referred<Practitioner>;

		request: Referred<
			Resource<
				"InvestigationRequest",
				{
					data: InvRequestData;
				}
			>
		>;

		result: Referred<Observation<InvestigationResult>>;
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
		reporter: Referred<Patient | Practitioner>;

		/**
		 * observation attached to the report
		 */
		result: Referred<Observation<D>>;
	},
	C
>;
