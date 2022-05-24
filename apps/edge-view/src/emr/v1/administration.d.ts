export type HealthcareService<Data> = Resource<
	"HealthcareService",
	{
		active: boolean;
		data: Data;
		services: string[];
		name: string[];
		// ... to add other information
	}
>;
