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

type InitialPropsType = { [field: string]: any };
type ActionList = { [fnName: string]: (...a: any[]) => any };

type WorkflowScreen<
	InitialProps extends InitialPropsType,
	Actions extends ActionList
> = {
	entry: InitialProps;
	actions: Actions;
};

type Language = "en" | "sw";
