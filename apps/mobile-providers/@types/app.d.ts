type Sex = "male" | "female";

type DBDateTime = number;

type UserObject = { fullName: string; id: string; email: string };

type Patient = {
	id: string;
	firstName: string;
	lastName: string;
	phone: string;
	address: string;
	dateOfBirth: DBDateTime;
	sex: Sex;
};
