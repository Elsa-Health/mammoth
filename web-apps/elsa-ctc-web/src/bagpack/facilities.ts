type Facility = {
	uid: string;
	name: string;
	facilityCode: string;
	lat: number;
	lng: number;
};

/**
 * Or pull from
 * https://console.firebase.google.com/u/1/project/elsa-providers/firestore/data/~2Ffacilities
 */
const _facilities: Facility[] = [
	{
		uid: "7a833cdc-2e28-11eb-adc1-0242ac120002",
		name: "Meru District Hospital",
		facilityCode: "02020100",
		lat: -3.3707193,
		lng: 36.787432,
	},
	//   {
	//     uid: 'eeb715c6-8876-11eb-8dcd-0242ac130003',
	//     name: 'Mount Meru Regional Referral Hospital',
	//     facilityCode: '',
	//     lat: -3.3662551,
	//     lng: 36.6943712,
	//   },
	{
		uid: "ba1d9a84-5977-11eb-ae93-0242ac130002",
		name: "Elsa Tester",
		facilityCode: "00000000",
		lat: 0,
		lng: 0,
	},
	{
		uid: "UTlri6BL6lX8YJmmt4NI",
		name: "Testing the Waters",
		facilityCode: "11111111",
		lat: 0,
		lng: 0,
	},
	{
		uid: "7a833f48-2e28-11eb-adc1-0242ac120002",
		name: "Mbuguni CTC",
		facilityCode: "02020101",
		lat: -3.552808,
		lng: 36.916711,
	},
	{
		uid: "aa99d3c6-bbdc-11eb-8529-0242ac130003",
		name: "Usa Dream",
		facilityCode: "02020250",
		lat: -3.371511,
		lng: 36.859306,
	},
	{
		uid: "90e1d49a-c836-11eb-b8bc-0242ac130003",
		name: "Nkoaranga Lutheran Hospital",
		facilityCode: "02020300",
		lat: -3.552808,
		lng: 36.916711,
	},
	{
		uid: "49a63e79-ebec-4d86-8373-af2346920d16",
		name: "Usa Government",
		facilityCode: "02020500",
		lat: -3.3727842,
		lng: 36.8485846,
	},
	{
		uid: "7f6cbe41-5b52-4749-81ab-c35c7cc3ee35",
		name: "Momela",
		facilityCode: "02020118",
		lat: -3.213349,
		lng: 36.8618031,
	},
	{
		uid: "459ce917-0387-457e-890a-5a8a6a652f47",
		name: "Makiba",
		facilityCode: "02020105",
		lat: -3.510143,
		lng: 36.9604938,
	},
	{
		uid: "e1b2fdca-c709-4308-a4a6-3879f9576155",
		name: "Ngarenanyuki Health Centre",
		facilityCode: "02020103",
		lat: -3.1387532,
		lng: 36.8741299,
	},
	{
		uid: "d61290c4-7a6c-4993-84f4-6629adeaba08",
		name: "Mareu",
		facilityCode: "02020120",
		lat: 0,
		lng: 0,
	},
];

const facilityCodeMap: { [fid: string]: Facility } = {};
_facilities.forEach((facility) => {
	facilityCodeMap[facility.facilityCode] = facility;
});

export const getFacilityFromCode = (facilityCode: string): Facility | null => {
	return facilityCodeMap[facilityCode] ?? null;
};

export const facilities = () =>
	_facilities.map(({ lat: _, lng: _1, ...other }) => other);
export const facilityCodes = () => facilities().map((s) => s.facilityCode);
