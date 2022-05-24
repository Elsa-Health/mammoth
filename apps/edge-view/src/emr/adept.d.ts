import { HealthcareService } from "./v1/administration";

// links the patient with faciilty
export type Link = {
	resourceType: "Link";
	patient: Referred<Patient>;
	currentFacility: Referred<HealthcareService>;
};
