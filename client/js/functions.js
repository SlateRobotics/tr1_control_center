var functions = [];

functions.push({
	name: "fart",
	url: "/command/fart",
	arguments: [],
	argumentNames: []
});

functions.push({
	name: "say",
	url: "/command/say",
	arguments: ["string"],
	argumentNames: ["speechText"]
});

functions.push({
	name: "goToPosition",
	url: "/command/go_to_position",
	arguments: ["number", "number", "number"],
	argumentNames: ["x", "y", "z"]
});

functions.push({
	name: "getJointStates",
	url: "/command/get_joint_states",
	arguments: [],
	argumentNames: []
});
