// Supabase configuration
// --------------------------------
import { nanoid } from "nanoid";
import { HybridLogicalClock } from "papai/distributed/clock";

// Clock for versioning state changes in the server
let ServerClock = new HybridLogicalClock(nanoid(8));
export const getServerClock = () => {
	ServerClock = ServerClock.next();
	return ServerClock;
};
